const net = require('net');

// fork of node-spamd
const compose = ({
  host = 'localhost',
  from,
  to,
  subject,
  html,
  text,
  date = new Date().toUTCString()
}) => `
Message-ID: <4F452339.1040102@${host}>
Date: ${date}
From: ${from}
To: ${to}
Subject: ${subject}
Content-Type: multipart/alternative; boundary="_----lnPb3o3S8hyX/jLO+ZOMYg===_FA/5E-15947-D76AD5C5"
MIME-Version: 1.0

--_----lnPb3o3S8hyX/jLO+ZOMYg===_FA/5E-15947-D76AD5C5
Content-Type: text/plain; charset=UTF-8
Content-Transfer-Encoding: quoted-printable

${text}

--_----lnPb3o3S8hyX/jLO+ZOMYg===_FA/5E-15947-D76AD5C5
Content-Type: text/html; charset=UTF-8
Content-Transfer-Encoding: quoted-printable

${html}

--_----lnPb3o3S8hyX/jLO+ZOMYg===_FA/5E-15947-D76AD5C5--
`.trim()

const check = ({
  host = 'localhost',
  port = 783,
  from = 'brian.kemper@messagesystems.com',
  to = 'brian.kemper@sparkpost.com',
  subject,
  html,
  text
}) => {
  // see, https://nodejs.org/api/net.html#net_net_connect_port_host_connectlistener
  const connection = net.connect(port, host, () => {
    connection.write("SYMBOLS SPAMC/1.3\r\n", () => {
      connection.write("User: " + to + "\r\n\r\n", () => {
        connection.write("X-Envelope-From: " + from + "\r\n", () => {
          const message = compose({ host, to, from, subject, html, text });

          connection.write(message);
          connection.end('\r\n');
        });
      });
    });
  });

  connection.on('data', (data) => {
    console.log('data', data.toString());
    connection.end();
  });

  connection.on('error', (error) => {
    console.log('error', error);
    connection.end();
  });

  connection.on('timeout', () => {
    console.log('timeout');
    connection.end();
  });

  connection.on('end', () => {
    console.log('end');
  });
}

const html = `
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>My First Email</title>
<style type="text/css">
@media(max-width:480px){
table[class=main_table],table[class=layout_table]{width:300px !important;}
table[class=layout_table] tbody tr td.header_image img{width:300px !important;height:auto !important;}
}
a{color:#37aadc}
</style>
</head>
<body>
<div style="color:transparent;visibility:hidden;opacity:0;font-size:0px;border:0;max-height:1px;width:1px;margin:0px;padding:0px;border-width:0px!important;display:none!important;line-height:0px!important;"><img border="0" width="1" height="1" src="http://go.sparkpostmail1.com/q/M8q76QUmEiejOk81SzS69g~~/AAPfsQA~/RgReREpWPVcDc3BjQgoAHlbFYVwmXrUAUhpicmlhbi5rZW1wZXJAc3Bhcmtwb3N0LmNvbVgEAAAAAA~~"/></div>

<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tbody>
<tr>
<td align="center" valign="top">
<!--  M A I N T A B L E  S T A R T  -->
<table border="0" cellpadding="0" cellspacing="0" class="main_table" width="600">
  <tbody>
  <tr>
  <td>
    <!--  L A Y O U T _ T A B L E  S T A R T  -->
  <table border="0" cellpadding="0" cellspacing="0" class="layout_table" style="border-collapse:collapse;border:1px solid #CCCCCC;" width="100%" >
    <tbody>
    <!--  H E A D E R R O W  S T A R T  -->
    <tr>
    <td align="left" class="header_image"><img height="120" src="https://www.sparkpost.com/sites/default/files/pictures/email/header-generic-600x120.png" width="600" style="border:0;display:block;"></td>
    </tr>
    <!--  H E A D E R R O W  E N D  -->
    <tr><td style="font-size:13px;line-height:13px;margin:0;padding:0;">&nbsp;</td></tr>
    <!--  B O D Y R O W  S T A R T  -->
    <tr>
    <td align="center" valign="top">
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="85%">
        <tbody>
        <tr>
        <td align="center">
          <p style="font-family:Arial, Helvetica, sans-serif;font-size:1400px;line-height:22px;">
            This is my first test message sent from SparkPost.com!<br>
            WooHoo!!!
          </p>
        </td>
        </tr>
        </tbody>
      </table>
    </td>
    </tr>
    <!--  B O D Y R O W  E N D  -->
    <tr><td style="font-size:13px;line-height:13px;margin:0;padding:0;">&nbsp;</td></tr>
    <!--  F O O T E R R O W  S T A R T  -->
    <tr>
    <td align="left" class="header_image"><a href="http://go.sparkpostmail1.com/f/a/5_BOrYZDVHdz7aM2PJdb8Q~~/AAPfsQA~/RgReREpWP0QaaHR0cHM6Ly93d3cuc3Bhcmtwb3N0LmNvbS9XA3NwY0IKAB5WxWFcJl61AFIaYnJpYW4ua2VtcGVyQHNwYXJrcG9zdC5jb21YBAAAAAA~"><img height="67" src="https://www.sparkpost.com/sites/default/files/pictures/email/footer-generic-600x67.png" width="600" style="border:0;display:block;" alt="Sent via SparkPost"></a></td>
    </tr>
    <!--  F O O T E R R O W  E N D  -->
    </tbody>
  </table>
  <!--  L A Y O U T _ T A B L E  E N D  -->
  </td>
  </tr>
  </tbody>
</table>
<!--  M A I N _ T A B L E  E N D  -->
</td>
</tr>
</tbody>
</table>

<img border="0" width="1" height="1" alt="" src="http://go.sparkpostmail1.com/q/uKcCkbOu_MNgIhaX8XrDCg~~/AAPfsQA~/RgReREpWPlcDc3BjQgoAHlbFYVwmXrUAUhpicmlhbi5rZW1wZXJAc3Bhcmtwb3N0LmNvbVgEAAAAAA~~">
</body>
</html>
`

const text = `
This is my first test message sent from SparkPost.com!<br>
WooHoo!!!
`

check({ subject: 'Hello World', html, text });
