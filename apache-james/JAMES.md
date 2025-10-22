# Apache James Server Setup

## Initial Setup

 **Current stable version:** 3.9.0 (as of 22-Oct-2025)

Useful links
- Official homepage: https://james.apache.org/
- Download page: https://james.apache.org/download.cgi
- Installation guide: https://james.apache.org/server/install.html
- Web administration: https://james.apache.org/server/manage-webadmin.html

Note: links may change over time.

Binary distribution
- **JPA James (legacy):** a simple binary distribution of the JPA James server with zero external dependencies (defaults to an embedded Derby database). Can be configured to use an external SQL database.

Installation notes
- The online installation guide may not be updated for the latest version by the time you see. Refer to the `README.adoc` file in your Apache James installation directory for the most up-to-date instructions.

the below steps are required to run set up and run the server correctly

#### cmd

```bash
keytool -genkeypair ^
  -alias james ^
  -keyalg RSA ^
  -keysize 2048 ^
  -storetype PKCS12 ^
  -keystore path/to/james/conf/keystore ^
  -storepass james72laBalle ^
  -validity 3650
```
```bash
java -javaagent:james-server-jpa-app.lib\openjpa-4.1.1.jar ^
     -Dworking.directory=path\to\james-installation-directory ^
     -Djdk.tls.ephemeralDHKeySize=2048 ^
     -Dlogback.configurationFile=conf\logback.xml ^
     -jar james-server-jpa-app.jar
```

#### powershell
```bash
keytool -genkeypair `
  -alias james `
  -keyalg RSA `
  -keysize 2048 `
  -storetype PKCS12 `
  -keystore path/to/james/conf/keystore `
  -storepass james72laBalle `
  -validity 3650
```
```bash
java `
  "-javaagent:james-server-jpa-app.lib\openjpa-4.1.1.jar" `
  "-Dworking.directory=C:\Tools\james-server-jpa-guice" `
  "-Djdk.tls.ephemeralDHKeySize=2048" `
  "-Dlogback.configurationFile=conf\logback.xml" `
  "-jar" "james-server-jpa-app.jar"
```

Note: The above commands are available in the `README.adoc` and `/conf/imapserver.xml` files.

Once the key is generated, check its availability in the `/conf` directory.

If you are using windows you may get below error during startup

```
java.lang.IllegalStateException: Generating JMX password file is not supported on Windows
        at com.google.common.base.Preconditions.checkState(Preconditions.java:513)
        at org.apache.james.modules.server.JMXServer.generateJMXPasswordFile(JMXServer.java:177)
        at org.apache.james.modules.server.JMXServer.generateJMXPasswordFileIfNeed(JMXServer.java:168)
        at org.apache.james.modules.server.JMXServer.doStart(JMXServer.java:126)
        ... 19 common frames omitted
Wrapped by: java.lang.RuntimeException: java.lang.IllegalStateException: Generating JMX password file is not supported on Windows
        at org.apache.james.modules.server.JMXServer.doStart(JMXServer.java:146)
        at org.apache.james.modules.server.JMXServer.start(JMXServer.java:97)
        at org.apache.james.modules.server.JMXServerModule.lambda$startJmxServer$0(JMXServerModule.java:130)
        at org.apache.james.utils.InitilizationOperationBuilder$PrivateImpl.initModule(InitilizationOperationBuilder.java:80)
        at com.github.fge.lambdas.consumers.ConsumerChainer.lambda$sneakyThrow$9(ConsumerChainer.java:73)
        at java.base/java.util.stream.ReferencePipeline$15$1.accept(ReferencePipeline.java:540)
        at java.base/java.util.ArrayList.forEach(ArrayList.java:1596)
        at java.base/java.util.stream.SortedOps$RefSortingSink.end(SortedOps.java:395)
        at java.base/java.util.stream.DistinctOps$1$2.end(DistinctOps.java:168)
        at java.base/java.util.stream.Sink$ChainedReference.end(Sink.java:261)
        at java.base/java.util.stream.AbstractPipeline.copyInto(AbstractPipeline.java:510)
        at java.base/java.util.stream.AbstractPipeline.wrapAndCopyInto(AbstractPipeline.java:499)
        at java.base/java.util.stream.ReduceOps$ReduceOp.evaluateSequential(ReduceOps.java:921)
        at java.base/java.util.stream.AbstractPipeline.evaluate(AbstractPipeline.java:234)
        at java.base/java.util.stream.ReferencePipeline.collect(ReferencePipeline.java:682)
        at org.apache.james.utils.InitializationOperations.processStartables(InitializationOperations.java:52)
        at org.apache.james.utils.InitializationOperations.initModules(InitializationOperations.java:41)
        at org.apache.james.GuiceJamesServer.start(GuiceJamesServer.java:95)
        at org.apache.james.JamesServerMain.main(JamesServerMain.java:30)
        at org.apache.james.JPAJamesServerMain.main(JPAJamesServerMain.java:123)
```
This comes from James’ JMX server module:

- The James server tries to generate a JMX password file automatically.

- This feature only works on Linux/Unix because it relies on filesystem permissions and atomic operations that Windows does not support.

- On Windows, the code throws an IllegalStateException to prevent file corruption.

Edit your `conf/jmx.xml` and make sure JMX authentication is disabled or manually provide the password file.

Now the Server should run without any error.

## Web Administration

The web administration supports the CRUD operations on the domains, the users, their mailboxes and their quotas, managing mail repositories, and much more, as described in the [web administration page](https://james.apache.org/server/manage-webadmin.html).


