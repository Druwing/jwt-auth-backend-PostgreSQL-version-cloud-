#!/bin/bash
curl -X POST http://localhost:3000/api/auth/register \
-H "Content-Type: application/json" \
-d '{
  "name": "Teste",
  "email": "teste@example.com"
}'