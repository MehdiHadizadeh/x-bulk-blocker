# x-bulk-blocker

**Safe & simple bulk-block tool for X (Twitter)**  
A tiny browser-console script that lets you block hundreds of accounts by username — without extensions, without API keys, and without risking your account.

Works perfectly in 2025 on the current X.com single-page app.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Features

- 100 % DOM-based → X sees it exactly like manual clicking  
- Fully SPA-aware (no script crashes when navigating)  
- Resumable (if interrupted, just restart from any index)  
- Random human-like delays (2–5 seconds by default)  
- No installation — just copy-paste into the browser console  

## How to Use (30 seconds)

1. Go to https://x.com/home and make sure you’re logged in  
2. Open Developer Console  
   → Press `F12` or `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac) → click the **Console** tab  
3. Copy the entire script from [`bulk-block.js`](bulk-block.js)  
4. Paste it into the console and press **Enter**  
5. When prompted:  
   - Paste your usernames (one per line, **no @ needed**)  
   - Click OK  
   - Choose starting index (usually `0`) → OK  
6. Sit back. The script will block one account at a time and show progress.

Done → Check your blocked list: https://x.com/settings/blocked

## Safety & Recommended Limits (2025)

| Daily volume       | Risk with this script | Risk with Red Block | Recommendation                                  |
|-----------------|-----------------------|---------------------|------------------------------------------------|
| ≤ 200 accounts  | Extremely low         | Zero                | One session is fine with either tool           |
| 200–500 accounts| Very low              | Zero                | Script is still safe; Red Block is faster      |
| 500–1000 accounts| Low–Moderate         | Extremely low       | Prefer Red Block or split script into 2–3 days |
| > 1000 accounts | Moderate–High         | Very low            | Use Red Block or similar extension              |

With the default 2–5 second random delay you stay **well below** X’s rate limits.  
Thousands of users run similar scripts weekly with no bans or locks.

**Why use this script when Red Block exists?**  
→ Because Red Block is the gold standard for large-scale blocking (1000+),  
but this script is the perfect lightweight, no-install, always-works alternative for

  • when extensions are blocked  
  • when Red Block is temporarily broken after an X update  
  • when you only need to block a few hundred accounts  
  • or when you just love having full control over the code.

## Tips

- Test first with 3–5 usernames  
- If you ever see “Something went wrong” → just wait 10–15 minutes and continue  
- Older or Premium accounts have higher limits and almost never get temporary locks  
- Want zero screen flashing? Use the excellent Chrome/Firefox extension **Red Block** instead


## Files

- `bulk-block.js` → the script (copy-paste ready)  
- `example-usernames.txt` → sample format

## Troubleshooting

| Problem                        | Fix                                                    |
|--------------------------------|--------------------------------------------------------|
| Script stops mid-way           | Re-run and enter the last successful index when asked  |
| “Element not found”            | User doesn’t exist or is suspended → automatically skipped |
| Too fast / temporary lock      | Increase `DELAY_MIN` and `DELAY_MAX` to 4000–8000 ms   |

## Legal / Ethical Note

Use only to block spam, bots, harassers, or accounts you don’t want to see.  
Mass-blocking for coordinated harassment violates X’s rules.

## Contributing

Pull requests are welcome! Especially:
- Better selectors for future X UI changes  
- Optional file-upload (drag-and-drop usernames)  
- Tampermonkey version

## License

MIT © 2025 – feel free to fork, share, and improve.

---

Made because cleaning your timeline shouldn’t be painful.