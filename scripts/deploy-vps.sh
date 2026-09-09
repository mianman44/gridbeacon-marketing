#!/usr/bin/env bash
set -euo pipefail
commit="$1"
[[ "$commit" =~ ^[0-9a-f]{40}$ ]]
release="stitch-${commit:0:12}"
app=/opt/gridbeacon-marketing
staging="/opt/gridbeacon-marketing-${release}"
archive="/tmp/gridbeacon-marketing-${commit}.tar.gz"
image="gridbeacon-marketing:${release}"
backup="gridbeacon-marketing-rollback-${commit:0:12}"
candidate="gridbeacon-marketing-candidate-${commit:0:12}"
[[ -s "$archive" && ! -e "$staging" ]]
mkdir "$staging"
tar -xzf "$archive" -C "$staging"
[[ -f "$staging/Dockerfile" && -f "$staging/public/branding/gridbeacon-transparent.webp" ]]
previous=$(docker inspect gridbeacon-marketing --format '{{.Config.Image}}')
printf 'Previous image: %s\nNew commit: %s\n' "$previous" "$commit"
set -a
. /opt/gmb-tracker/.env
set +a
docker build --build-arg "NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}" --build-arg "NEXT_PUBLIC_PADDLE_CLIENT_TOKEN=${PADDLE_CLIENT_TOKEN}" --build-arg "NEXT_PUBLIC_PADDLE_ENVIRONMENT=${PADDLE_ENVIRONMENT}" -t "$image" "$staging"
docker run -d --name "$candidate" -p 127.0.0.1:3014:3000 "$image"
cleanup_candidate() { docker rm -f "$candidate" >/dev/null 2>&1 || true; }
trap cleanup_candidate EXIT
ready=false
for attempt in $(seq 1 40); do
  if curl -fsS http://127.0.0.1:3014/ >/dev/null; then ready=true; break; fi
  sleep 2
done
[[ "$ready" == true ]]
for path in / /features /how-it-works /pricing /about /contact /security /privacy /terms /refund-policy /cancellation-policy /branding/gridbeacon-transparent.webp /stitch-utilities.css /features-utilities.css /pricing-utilities.css /how-utilities.css; do
  curl -fsS "http://127.0.0.1:3014${path}" -o /dev/null
done
cleanup_candidate
trap - EXIT
docker stop gridbeacon-marketing >/dev/null
docker rename gridbeacon-marketing "$backup"
rollback() {
  docker rm -f gridbeacon-marketing >/dev/null 2>&1 || true
  docker rename "$backup" gridbeacon-marketing
  docker start gridbeacon-marketing >/dev/null
  echo 'Deployment failed; previous container restored.' >&2
}
trap rollback ERR
docker run -d --name gridbeacon-marketing --restart unless-stopped -p 127.0.0.1:3013:3000 "$image"
ready=false
for attempt in $(seq 1 40); do
  if curl -fsS http://127.0.0.1:3013/ >/dev/null; then ready=true; break; fi
  sleep 2
done
[[ "$ready" == true ]]
for path in / /features /how-it-works /pricing; do curl -fsS "http://127.0.0.1:3013${path}" -o /dev/null; done
if [[ -d "$app" ]]; then mv "$app" "${app}.before-${release}"; fi
mv "$staging" "$app"
printf '%s\n' "$commit" > "$app/DEPLOYED_COMMIT"
trap - ERR
printf 'DEPLOYED %s\nROLLBACK_CONTAINER %s\n' "$commit" "$backup"
