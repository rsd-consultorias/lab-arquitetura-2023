# Lab Arquitetura 2023 - Integrações
## Integração entre serviços com **Kafka**

### Cenário fictício
Para testar as integrações será definido o seguinte cenário de negócio:

- Usuário acessa **site*** do banco para cadastrar uma conta nova;
- Após digitar os dados, envia o formulário e os dados deverão ser analisados por um ***serviço externo*** ao site;
- Após ter os dados analisados e aprovados, o resultado deve ser enviado para ***outro serviço*** que será responsável
        por finalizar a abertura da conta;
- Após finalizar a abertura da conta, deverá ser ***enviado um e-mail*** ao usuário informando a nova conta;
- Durante o processamento, toda vez que o usuário tentar se cadastrar de novo, deverá exibir uma mensagem informando o ***estado atual do processo***.



# Comandos do Kafka

``` bash
# Iniciar serviço ZooKeeper
sh bin/zookeeper-server-start.sh config/zookeeper.properties

# Iniciar Kafka broker service
sh bin/kafka-server-start.sh config/server.properties

# Criar um tópico
sh bin/kafka-topics.sh --create --topic nome-topico --bootstrap-server localhost:9092

# Listar tópicos
sh bin/kafka-topics.sh --describe --topic quickstart-events --bootstrap-server localhost:9092

# Escrever uma mensagem no tópico
sh bin/kafka-console-producer.sh --topic quickstart-events --bootstrap-server localhost:9092

# Receber mensagem do tópico
# note que o parâmetro --from-beginning lê todas as mensagens desde o início
sh bin/kafka-console-consumer.sh --topic quickstart-events --from-beginning --bootstrap-server localhost:9092

# Para apagar os dados gerados durante os testes
rm -rf /tmp/kafka-logs /tmp/zookeeper /tmp/kraft-combined-logs
```

Para terminar os serviço basta tecla CTRL+C nos consoles abertos

## Referências
[Apache Quick Start](https://kafka.apache.org/quickstart)
