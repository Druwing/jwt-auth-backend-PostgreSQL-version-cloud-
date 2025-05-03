#!/bin/bash
# Primeiro faz login para obter o token
response=$(curl -s -X POST http://localhost:3000/api/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "testuser@example.com",
  "password": "Senha@123"
}')

token=$(echo $response | jq -r '.data.token')

# Agora acessa a rota protegida
curl -X GET http://localhost:3000/api/protected \
-H "Authorization: Bearer $token"