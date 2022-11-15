## Comandos

Instalar dependências:
```
yarn install
```

Rodar o ambiente de desenvolvimento:
```
npx expo start
```

Para conseguir testar o login com o Google na web, execute o comando anterior passando a flag `--https`:
```
npx expo start --web --https
```

Para fazer o emulador do Android enxergar a API rodando localmente:

```
adb reverse tcp:<API_PORT> tcp:<API_PORT>
```