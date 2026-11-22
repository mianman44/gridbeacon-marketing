"""Synthetic public-service analytics and anonymous free-result promotion QA."""
import json
from pathlib import Path
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser=p.chromium.launch(headless=True)
    page=browser.new_page(viewport={'width':390,'height':844});errors=[]
    page.on('pageerror',lambda e:errors.append(str(e)))
    page.goto('http://127.0.0.1:3317/services/profile-optimization')
    page.get_by_role('link',name='Request this service').wait_for(timeout=60000)
    page.get_by_role('link',name='Request this service').evaluate("el=>el.addEventListener('click',e=>e.preventDefault())")
    page.get_by_role('link',name='Request this service').click()
    events=page.evaluate("window.__gridbeaconEvents.filter(e=>e.name.startsWith('seo_service_'))")
    assert {e['name'] for e in events}=={'seo_service_viewed','seo_service_request_clicked'}
    assert all(e['params']['page_location']=='http://127.0.0.1:3317/services' for e in events)
    result={'token':'preview-private-token','status':'completed','business_name':'QA Dental','formatted_address':None,'keyword':'dentist','radius_miles':1,'grid_size':3,'stages':[],'metrics':{'average_rank':20,'visibility':0,'top3_count':0,'top3_percentage':0,'total_points':9,'ranked_points':9,'best_rank':20,'worst_rank':20,'radius_miles':1},'points':[{'grid_row':r,'grid_col':c,'latitude':31+r*.001,'longitude':74+c*.001,'rank':20} for r in range(3) for c in range(3)],'competitors':[],'insight':None,'failure_reason':None}
    page.route('**/free-rank-check/result/preview-private-token',lambda route:route.fulfill(status=200,content_type='application/json',body=json.dumps(result)))
    page.goto('http://127.0.0.1:3317/google-maps-rank-checker/result/preview-private-token')
    prompt=page.get_by_role('complementary',name='Optional paid SEO services');prompt.wait_for(timeout=60000)
    link=page.get_by_role('link',name='Explore Local SEO Services');link.evaluate("el=>el.addEventListener('click',e=>e.preventDefault())");link.click()
    events=page.evaluate("window.__gridbeaconEvents.filter(e=>e.name.startsWith('seo_service_'))")
    assert len(events)==1 and events[0]['params']['reason']=='general_help'
    assert 'preview-private-token' not in json.dumps(events) and 'QA Dental' not in json.dumps(events)
    page.get_by_role('button',name='Dismiss service promotion').click();page.reload();page.get_by_text('QA Dental',exact=True).wait_for(timeout=60000)
    assert page.get_by_role('complementary',name='Optional paid SEO services').count()==0
    assert not errors,errors
    print(json.dumps({'result':'passed','service_events_verified':3,'private_token_in_new_event_payload':False,'dismissal_persisted':True,'console_errors':errors}))
    browser.close()
