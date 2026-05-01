import time
import pyperclip
from analyzer import analyze_prompt

def monitor_clipboard():
    print("🛡️ SentinelAI Clipboard Monitor Started...")
    print("Monitoring for sensitive data...")
    
    last_clipboard_content = ""
    
    try:
        while True:
            current_clipboard = pyperclip.paste()
            
            # Only trigger on new clipboard content
            if current_clipboard != last_clipboard_content and current_clipboard.strip():
                last_clipboard_content = current_clipboard
                
                # Analyze risk using existing logic
                analysis = analyze_prompt(current_clipboard)
                
                if analysis.get("risk") in ["HIGH", "WARNING"]:
                    print("\n" + "="*50)
                    print(f"⚠️ Sensitive data detected in clipboard.")
                    print(f"Reason: {analysis.get('reason')}")
                    print(f"Avoid sharing in AI tools.")
                    print("="*50 + "\n")
                    
                    # Native macOS notification
                    import os
                    os.system("osascript -e 'display notification \"Avoid sharing in AI tools.\" with title \"⚠️ Sensitive data detected in clipboard\"'")
                    
            time.sleep(1) # Check every second
            
    except KeyboardInterrupt:
        print("\nStopping SentinelAI Clipboard Monitor.")
    except Exception as e:
        print(f"Clipboard monitoring error: {e}")

if __name__ == "__main__":
    monitor_clipboard()
