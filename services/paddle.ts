import {
  initializePaddle,
  type Paddle,
} from "@paddle/paddle-js";


let paddlePromise:
  Promise<Paddle | undefined>
  | null = null;


export function getPaddle() {
  if (paddlePromise) {
    return paddlePromise;
  }

  const token =
    process.env
      .NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;

  const environment =
    process.env
      .NEXT_PUBLIC_PADDLE_ENVIRONMENT;

  if (!token) {
    throw new Error(
      "Paddle client token is missing."
    );
  }

  paddlePromise = initializePaddle({
    token,

    ...(environment === "sandbox"
      ? {
          environment:
            "sandbox" as const,
        }
      : {}),
  });

  return paddlePromise;
}
