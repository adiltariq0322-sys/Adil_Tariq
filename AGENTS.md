# Project Architecture Rules

- Portfolio chat uses AI SDK UI messages end-to-end with AI Elements rendering and the Lovable AI Gateway Responses API, because this preserves complete context, safe markdown, and streaming compatibility.
- Portfolio chat remains one non-persistent browser session, because the user approved no conversation database or thread navigation.
