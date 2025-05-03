#!/bin/bash
curl -X POST http://localhost:3000/api/auth/register \
-H "Content-Type: application/json" \
-d '{
  "name": "Usuário Válido",
  "email": "testuser@example.com",
  "password": "Senha@123"
}'