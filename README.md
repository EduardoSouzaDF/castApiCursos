# LoopBack IBM

Essa aplicação foi gerada usando [LoopBack 4 CLI](https://loopback.io/doc/en/lb4/Command-line-interface.html)
com base em
[layot de projeto gerado ple cli](https://loopback.io/doc/en/lb4/Loopback-application-layout.html).

# MongoDB

Estou usando uma instância do mongoDb Atlas, não sendo necessário
instalar o mongoDB para usar, mas caso queiram mudar o arquivo de configuração
src\datasources\mongodb.datasource.ts

## Instalando dependências

```
npm install
```

## Rodando a aplicação

aplicação já está com watch nas dependências para dev,, hot reload

```sh
npm start
```

Abra http://127.0.0.1:3000/explorer/ no navegador

## Inserção de categorias

realizei uma rota de api para realização dos seeds, apesar de a versão 4
ser relativamente nova ainda não olhei a questão dos seeds pois somente
está desenvolvido a parte de migrations pelo Loopback

## Scripts de banco de dados

Mongo não necessita de collections previamente criadas para se trabalhar
ele cria as collections automaticamente em tempo de execução, da mesma forma
com migrations, no caso de adicionar colunas ele as cria em tempo de execução
ou melhor tudo é JSON

Porém fiz um EER que está em : src/obs/banco_EER_mysl.mwb [ mysl workbench abre]

## Resumindo o MVC do LoopBack

- as controller estão em : src\controllers
- as repositories em : src\repositories
- os modelos em : src\models
- com loopback podemos trabalhar com diferentes bancos de dados ao mesmo tempo
  pois temos configuração sobre as repositories e as conexões de banco de dados
  pode-se por exemplo ter uma entidade em mongoDB fazendo relação com uma entidade
  em mysql, estas configurações estão em : src\datasources
