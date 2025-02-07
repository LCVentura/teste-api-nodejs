# Documentação da API

## Visão Geral
Esta API gerencia usuários e endereços, permitindo criação, leitura, atualização e exclusão de registros.

### Base URL
```
http://localhost:3000/users
http://localhost:3000/auth
```

---

## **1. Usuários**

### **Criar Usuário**
**Rota:** `POST /users`

**Corpo da requisição (JSON):**
```json
{
  "name": "Leonardo Ventura",
  "email": "leonardo@email.com",
  "phone": "11999999999",
  "age": 30,
  "ethnicity": "Pardo",
  "password": "senha123"
}
```

**Resposta (201 - Criado):**
```json
{
  "id": 1,
  "name": "Leonardo Ventura",
  "email": "leonardo@email.com",
  "phone": "11999999999",
  "age": 30,
  "ethnicity": "Pardo"
}
```

---

### **Listar Usuários**
**Rota:** `GET /users`

**Resposta (200 - OK):**
```json
[
  {
    "id": 1,
    "name": "Leonardo Ventura",
    "email": "leonardo@email.com",
    "phone": "11999999999",
    "age": 30,
    "ethnicity": "Pardo"
  }
]
```

---

### **Buscar Usuário por ID**
**Rota:** `GET /users/:id`

**Exemplo:** `/users/1`

**Resposta (200 - OK):**
```json
{
  "id": 1,
  "name": "Leonardo Ventura",
  "email": "leonardo@email.com",
  "phone": "11999999999",
  "age": 30,
  "ethnicity": "Pardo"
}
```

---

### **Atualizar Usuário**
**Rota:** `PUT /users/:id`

**Exemplo:** `/users/1`

**Corpo da requisição (JSON):**
```json
{
  "name": "Leonardo Oliveira",
  "phone": "11988888888"
}
```

**Resposta (200 - OK):**
```json
{
  "id": 1,
  "name": "Leonardo Oliveira",
  "email": "leonardo@email.com",
  "phone": "11988888888",
  "age": 30,
  "ethnicity": "Pardo"
}
```

---

### **Deletar Usuário**
**Rota:** `DELETE /users/:id`

**Exemplo:** `/users/1`

**Resposta (204 - Sem Conteúdo)**

---

## **2. Endereços**

### **Criar Endereço**
**Rota:** `POST /addresses`

**Corpo da requisição (JSON):**
```json
{
  "address": "Rua A, 123",
  "number": "123",
  "complement": "Apto 101",
  "zip_code": "12345-678",
  "city": "São Gonçalo",
  "state": "RJ",
  "userId": 1
}
```

**Resposta (201 - Criado):**
```json
{
  "id": 1,
  "address": "Rua A, 123",
  "number": "123",
  "complement": "Apto 101",
  "zip_code": "12345-678",
  "city": "São Gonçalo",
  "state": "RJ",
  "userId": 1
}
```

---

### **Listar Endereços**
**Rota:** `GET /addresses`

**Resposta (200 - OK):**
```json
[
  {
    "id": 1,
    "address": "Rua A, 123",
    "number": "123",
    "complement": "Apto 101",
    "zip_code": "12345-678",
    "city": "São Gonçalo",
    "state": "RJ",
    "userId": 1
  }
]
```

---

### **Buscar Endereço por ID**
**Rota:** `GET /addresses/:id`

**Exemplo:** `/addresses/1`

**Resposta (200 - OK):**
```json
{
  "id": 1,
  "address": "Rua A, 123",
  "number": "123",
  "complement": "Apto 101",
  "zip_code": "12345-678",
  "city": "São Gonçalo",
  "state": "RJ",
  "userId": 1
}
```

---

### **Atualizar Endereço**
**Rota:** `PUT /addresses/:id`

**Exemplo:** `/addresses/1`

**Corpo da requisição (JSON):**
```json
{
  "city": "Rio de Janeiro",
  "state": "RJ"
}
```

**Resposta (200 - OK):**
```json
{
  "id": 1,
  "address": "Rua A, 123",
  "number": "123",
  "complement": "Apto 101",
  "zip_code": "12345-678",
  "city": "Rio de Janeiro",
  "state": "RJ",
  "userId": 1
}
```

---

### **Deletar Endereço**
**Rota:** `DELETE /addresses/:id`

**Exemplo:** `/addresses/1`

**Resposta (204 - Sem Conteúdo)**

---

## **3. Autenticação**

### **Login**
**Rota:** `POST /auth/login`

**Corpo da requisição (JSON):**
```json
{
  "email": "leonardo@email.com",
  "password": "senha123"
}
```

**Resposta (200 - OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI..."
}
```

---

## **Conclusão**
Essa documentação cobre todas as funcionalidades principais da API, incluindo gerenciamento de usuários, endereços e autenticação.

