curl --ssl-no-revoke -v https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer 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" \
  -d '{
    "model": "gpt-3.5-turbo",
    "messages": [{"role": "user", "content": "Test message"}]
  }'
