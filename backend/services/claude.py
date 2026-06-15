import os
from anthropic import AsyncAnthropic

CLAUDE_SYSTEM_PROMPT = """
You are a systems auditor expert in identifying discrepancies between timesheets, billings and contracts.

Your task is to perform an audit on the given dataset of timesheets, billings and contracts and identify any discrepancies between them.

Follow always the next steps:
1. Identify the discrepancies (only the ones marked as ERROR)
2. Identify the root cause of the discrepancies
3. Propose a solution to fix the discrepancies

Your response should be short and concise, formatted in Markdown.
"""


class Claude:
    def __init__(
        self,
        max_tokens: int = 1024,
        messages: list[dict[str, str]] = [],
        system_prompt: str = CLAUDE_SYSTEM_PROMPT,
    ) -> None:
        self.client = AsyncAnthropic(
            api_key=os.environ.get("ANTHROPIC_API_KEY"),
        )
        self.max_tokens = max_tokens
        self.messages = messages
        self.model = os.environ.get("CLAUDE_MODEL")
        self.system_prompt = system_prompt

    async def create_message(self, audit: str | dict, client_rules: str | None = None):
        user_content = f"""Here is the JSON array of the results of the audit:
<audit_result>
{audit}
</audit_result>"""
        if client_rules:
            user_content += f"""
\nValidate that all client rules are followed. Here are the client rules:
<client_rules>
{client_rules}
</client_rules>"""

        messages = self.messages + [{"role": "user", "content": user_content}]

        message = await self.client.messages.create(
            max_tokens=self.max_tokens,
            messages=messages,
            system=self.system_prompt,
            model=self.model,
        )
        return message.content
