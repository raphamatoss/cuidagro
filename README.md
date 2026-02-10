# 🌿 CuidAgro – Sistema de Monitoramento de Saúde Agrícola

O **CuidAgro** é uma solução tecnológica voltada para a promoção da saúde no campo, com foco na prevenção de doenças causadas pela exposição a agrotóxicos. O sistema permite o monitoramento integrado da saúde de agricultores, oferecendo suporte a diagnósticos precoces, geração de relatórios estratégicos e tomada de decisão por profissionais de saúde e gestores públicos.

---

## 🚜 Objetivo

Fornecer uma plataforma intuitiva e eficiente que centraliza dados clínicos, histórico de exposição e sintomas, permitindo acompanhamento contínuo do bem-estar dos trabalhadores rurais e suas famílias.

## 👥 Usuários Atendidos

* **Agricultores:** Registro de sintomas e recebimento de alertas personalizados.
* **Profissionais de Saúde:** Acesso a prontuários para diagnósticos mais precisos.
* **Gestores Públicos:** Relatórios e indicadores para políticas de saúde rural.
* **Agentes Comunitários:** Acompanhamento direto da população atendida.

## ⚙️ Principais Funcionalidades

* ✅ **Gestão de Acesso:** Cadastro e autenticação segura (JWT) com múltiplos perfis.
* 🩺 **Prontuário Digital:** Registro de dados de saúde e histórico de exposição a defensivos.
* 🔔 **Monitoramento:** Alertas automáticos de risco e notificações de consultas.
* 📊 **Dashboard:** Relatórios para análise epidemiológica e tomada de decisão.
* 🤖 **IA Auxiliar:** Ferramenta de pré-diagnóstico baseada em sintomas (Integração Google Gemini).

## 🌱 Impacto Esperado

* Redução de doenças ocupacionais no campo.
* Fortalecimento de políticas públicas de saúde.
* Melhoria da produtividade agrícola e qualidade de vida das comunidades rurais.

---

## 🛠️ Tecnologias Utilizadas

### Backend

* **Java 25** (Linguagem Core)
* **Spring Boot** (Framework Web)
* **Maven** (Gerenciador de Dependências)
* **PostgreSQL** (Banco de Dados)
* **Spring Security + JWT** (Autenticação)
* **Google Gemini API** (Inteligência Artificial)

### Frontend

* **React.js** (Biblioteca de Interface)
* **Vite** (Build Tool)
* **TailwindCSS** (Estilização)
* **Axios** (Consumo de API)
* **Node.js & npm** (Ambiente e Pacotes)

---

## 🚀 Guia de Instalação e Execução

Siga os passos abaixo para rodar o projeto em sua máquina local.

### Pré-requisitos

Certifique-se de ter instalado:

* [Java JDK 17 ou superior](https://www.google.com/search?q=https://www.oracle.com/java/technologies/downloads/)
* [Node.js 18+](https://www.google.com/search?q=https://nodejs.org/)
* [PostgreSQL](https://www.google.com/search?q=https://www.postgresql.org/)
* [Git](https://www.google.com/search?q=https://git-scm.com/)

---

### 1️⃣ Configuração do Banco de Dados

Antes de iniciar, crie um banco de dados no PostgreSQL chamado `mydb` (ou o nome de sua preferência).

```sql
CREATE DATABASE mydb;

```

---

### 2️⃣ Configuração do Backend (API)

1. **Clone o repositório:**
```bash
git clone https://github.com/raphamatoss/cuidagro.git

```


2. **Acesse a pasta do servidor:**
*(Supondo que o backend esteja na raiz ou pasta server)*
```bash
cd cuidagro

```


3. **Configure as credenciais:**
Abra o arquivo `src/main/resources/application.properties` e edite as configurações do banco:
```properties
# Configuração do Banco de Dados
spring.datasource.url=jdbc:postgresql://localhost:5432/mydb
spring.datasource.username=seu_usuario_postgres
spring.datasource.password=sua_senha_postgres

# Configuração do Servidor
server.port=9090

# Configurações de Segurança (JWT) e API Key (Gemini)
api.security.token.secret=${JWT_SECRET:sua_chave_secreta_aqui}
gemini.api.key=${GEMINI_API_KEY:sua_api_key_aqui}

```


4. **Instale as dependências e execute:**
```bash
# Limpar e empacotar o projeto (pula testes para agilizar)
mvn clean package -DskipTests

# Executar a aplicação
java -jar target/cuidagro-0.0.1-SNAPSHOT.jar

```


5. **Verifique:**
O backend estará rodando em: `http://localhost:9090`

---

### 3️⃣ Configuração do Frontend (Web)

1. **Acesse a pasta do frontend:**
Em um novo terminal, navegue até a pasta da interface web.
```bash
cd cuidagro/frontend

```


2. **Instale as dependências:**
```bash
npm install

```


3. **Configure a API:**
Verifique se o arquivo de configuração do Axios (ex: `src/services/api.js` ou `.env`) aponta para a porta correta do backend.
*Exemplo de arquivo `.env`:*
```env
VITE_API_URL=http://localhost:9090

```


4. **Inicie o servidor de desenvolvimento:**
```bash
npm run dev

```


5. **Acesse a aplicação:**
Abra o navegador e vá para: `http://localhost:5173`

---

## 🤝 Como Contribuir

1. Faça um **Fork** do projeto.
2. Crie uma nova branch com sua feature: `git checkout -b minha-feature`.
3. Faça commit das suas alterações: `git commit -m 'Adiciona nova funcionalidade'`.
4. Faça push para a branch: `git push origin minha-feature`.
5. Abra um **Pull Request**.

---

**Desenvolvido com 💚 pela equipe CuidAgro.**
