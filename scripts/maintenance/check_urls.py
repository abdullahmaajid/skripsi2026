import re
import urllib.request
import urllib.error
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

with open('/Users/abdullahmaajid/Downloads/polariusmain/projects/utbkapp/docs/skripsi/daftarpustaka.md', 'r') as f:
    text = f.read()

urls = re.findall(r'(https?://[^\s]+)', text)

def check_url(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        response = urllib.request.urlopen(req, context=ctx, timeout=10)
        return response.getcode()
    except urllib.error.HTTPError as e:
        return e.code
    except urllib.error.URLError as e:
        return str(e.reason)
    except Exception as e:
        return str(e)

invalid_urls = []
for url in urls:
    status = check_url(url)
    if status != 200:
        print(f"FAILED: {url} -> {status}")
        invalid_urls.append((url, status))
    else:
        print(f"OK: {url}")

print(f"\nTotal Checked: {len(urls)}, Invalid: {len(invalid_urls)}")
