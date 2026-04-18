const http = require("http");

const hostname = "0.0.0.0";
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");

  res.end(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>DevOps Project</title>
      <style>
        body {
          font-family: Arial;
          margin: 0;
        }
        header {
          background-color: #007BFF;
          color: white;
          padding: 15px;
          text-align: center;
        }
        main {
          padding: 20px;
          text-align: center;
        }
        footer {
          background-color: #333;
          color: white;
          padding: 10px;
          text-align: center;
          position: fixed;
          bottom: 0;
          width: 100%;
        }
      </style>
    </head>
    <body>

      <header>
        <h1>My DevOps Project</h1>
      </header>

      <main>
        <h2>Welcome!</h2>
        <p>This web application is running inside a Docker container.</p>
      </main>

      <footer>
        <p>© 2026 DevOps Project</p>
      </footer>

    </body>
    </html>
  `);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});