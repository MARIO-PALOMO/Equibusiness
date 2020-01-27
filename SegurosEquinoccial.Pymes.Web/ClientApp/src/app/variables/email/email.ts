export class VariablesEmail {

  public generarEmailReporte(cliente, codigo, total, link, colores, broker) {
    var cuerpo = `
    <!DOCTYPE html
	PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>EQUIBUSINESS</title>
</head>

<body style="Margin:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;min-width:100%;">
	<center class="wrapper"
		style="width:100%;table-layout:fixed;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
		<div class="webkit" style="max-width:600px;">

			<table class="outer" align="center"
				style="border-spacing:0;font-family:sans-serif;color:#333333;Margin:0 auto;width:100%;max-width:600px;">
				<!--CUERPO-->
				<tr>
					<td class="full-width-image"
						style="padding-top:10px;padding-bottom:10px;padding-right:10px;padding-left:0; text-align: right; background-color: rgb(`+ colores + `)">
						<img src="https://firebasestorage.googleapis.com/v0/b/segurosequinoccial-45797.appspot.com/o/CorreoElectronico%2Fsegurosequinoccialblanco.png?alt=media&token=0435df66-20fb-4928-8c7e-cf5252f0255d"
							alt="`+ broker + `" width="170">
					</td>
				</tr>
				<tr>
					<td class="full-width-image" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;">
						<img src="https://firebasestorage.googleapis.com/v0/b/segurosequinoccial-45797.appspot.com/o/CorreoElectronico%2F1.2.jpg?alt=media&token=df5656f5-0b8e-44b0-9dec-74a4a101354d"
							alt="Business" style="border-width:0;width:100%;height:auto;display:block;" />
					</td>
				</tr>
				<tr class="white-back" style="background-color:#f7f7f7;">
					<td class="one-column" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;">
						<table width="100%" style="border-spacing:0;font-family:sans-serif;color:#3c3c3c;">
							<tr>
								<td class="inner contents"
									style="padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;">
									<p class="h4 center grey"
										style="margin:0;color:#3c3c3c;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:20px;padding-left:20px;margin-top:0px !important;margin-bottom:0px !important;margin-right:0 !important;margin-left:0 !important;font-size:25px!important;line-height: 1.4 !important;">
										`+ cliente + `
									</p>
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr class="white-back" style="background-color:#f7f7f7;">
					<td class="one-column" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;">
						<table width="100%" style="border-spacing:0;font-family:sans-serif;color:#3c3c3c;">
							<tr>
								<td class="inner contents"
									style="padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;">
									<p class="h4 center grey"
										style="margin:0;color:#3c3c3c;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:20px;padding-left:20px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:15px!important;line-height: 1.4 !important;">
										Se ha generado una cotización con el código `+ codigo + `, con un valor total de
										<b style="font-size: 16px !important;">$ ` + total + `</b s><br><br>
										A continuación, ponemos a tu disposición los detalles de la cotización.<br><br>
										Ingresar al siguiente enlace para visualizar e imprimir la cotización:
									</p>
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td class="full-width-image"
						style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0; text-align: center; background-color: #f7f7f7">
						<br><br>
						<a href="`+ link + `" target="_blank" style="font-size: 17px !important; text-decoration: none; padding: 15px; padding-left: 30px !important; padding-right: 30px !important; background-color: rgb(` + colores + `); color: #FFFFFF;
                        border-radius: 30px 30px 30px 30px;
                        -moz-border-radius: 30px 30px 30px 30px;
                        -webkit-border-radius: 30px 30px 30px 30px;">
							Visualizar
						</a>
						<br><br><br>
					</td>
				</tr>
				<tr class="white-back" style="background-color:#f7f7f7;">
					<td class="one-column" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;">
						<table width="100%" style="border-spacing:0;font-family:sans-serif;color:#3c3c3c;">
							<tr>
								<td class="inner contents"
									style="padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;">
									<p class="h4 center grey"
										style="margin:0;color:#3c3c3c;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:0px !important;margin-right:0 !important;margin-left:0 !important;font-size:15px!important;line-height:1.5 !important;">
										Este mensaje ha sido generado automáticamente, por favor no respondas a este
										correo.
									</p>
									<br>
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr class="grey-back" style="background-color: rgb(`+ colores + `)">
					<td class="one-column" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;">
						<table width="100%" style="border-spacing:0;font-family:sans-serif;color:#fff;">
							<tr>
								<td class="inner contents"
									style="padding-top:10px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;">
									<p style="font-family: sans-serif !important;">
										<b>`+ broker + `</b>
									</p>
								</td>
							</tr>
						</table>
					</td>
				</tr>

			</table>
		</div>
	</center>
</body>

</html>`;
    return cuerpo;
  }

  public generarEmail(nombrePagador: any, broker: any, ruc: any, razonSocial: any, telefono: any, ramos: any, total: any, colores: any, link: any, foto) {
    var cuerpo = `
    <!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EQUIBUSINESS</title>
</head>

<body style="Margin:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;min-width:100%;">
    <center class="wrapper"
        style="width:100%;table-layout:fixed;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
        <div class="webkit" style="max-width:600px;">

            <table class="outer" align="center"
                style="border-spacing:0;font-family:sans-serif;color:#333333;Margin:0 auto;width:100%;max-width:600px;">
                <!--CUERPO-->
                <tr>
                    <td class="full-width-image"
                        style="padding-top:10px;padding-bottom:10px;padding-right:10px;padding-left:0; text-align: right; background-color: rgb(`+ colores + `)">
                        <img src="https://firebasestorage.googleapis.com/v0/b/segurosequinoccial-45797.appspot.com/o/CorreoElectronico%2Fsegurosequinoccialblanco.png?alt=media&token=0435df66-20fb-4928-8c7e-cf5252f0255d"
                            alt="`+ broker + `" width="170">
                    </td>
                </tr>
                <tr>
                    <td class="full-width-image" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;">
                        <img src="https://firebasestorage.googleapis.com/v0/b/segurosequinoccial-45797.appspot.com/o/CorreoElectronico%2F1.jpg?alt=media&token=21912479-04d4-42b0-b6a8-b8293ce19f53"
                            alt="Business" style="border-width:0;width:100%;height:auto;display:block;" />
                    </td>
                </tr>
                <tr class="white-back" style="background-color:#f7f7f7;">
                    <td class="one-column" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;">
                        <table width="100%" style="border-spacing:0;font-family:sans-serif;color:#3c3c3c;">
                            <tr>
                                <td class="inner contents"
                                    style="padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;">
                                    <p class="h4 center grey"
                                        style="margin:0;color:#3c3c3c;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:20px;padding-left:20px;margin-top:0px !important;margin-bottom:0px !important;margin-right:0 !important;margin-left:0 !important;font-size:25px!important;line-height: 1.4 !important;">
                                        `+ razonSocial + `
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class="white-back" style="background-color:#f7f7f7;">
                    <td class="one-column" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;">
                        <table width="100%" style="border-spacing:0;font-family:sans-serif;color:#3c3c3c;">
                            <tr>
                                <td class="inner contents"
                                    style="padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;">
                                    <p class="h4 center grey"
                                        style="margin:0;color:#3c3c3c;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:20px;padding-left:20px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:15px!important;line-height: 1.4 !important;">
                                        Felicitaciones, estás a un paso de contar con el mejor seguro para tu
                                        empresa.<br>
                                        Siéntete protegido y tranquilo, es un honor para nosotros poder ser parte de tu
                                        empresa.
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class="white-back" style="background-color:#f7f7f7;">
                    <td class="one-column" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;">
                        <table width="100%" style="border-spacing:0;font-family:sans-serif;color:rgb(`+ colores + `);">
                            <tr>
                                <td class="inner contents"
                                    style="padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;">
                                    <p class="h4 center grey"
                                        style="margin:0;color:rgb(`+ colores + `);text-align:center;padding-top:10px;padding-bottom:10px;padding-right:20px;padding-left:20px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:15px!important;line-height: 1.4 !important;">
                                        A continuación ponemos a tu disposición los detalles de tu seguro:
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class="white-back" style="background-color:#f7f7f7;">
                    <td class="one-column" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;">
                        <table width="100%" style="border-spacing:0;font-family:sans-serif;color:#3c3c3c;">
                            <tr>
                                <td class="inner contents"
                                    style="padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;">

                                    <div style="padding-left: 80px !important; padding-right: 80px !important">
                                        <table border="0"
                                            style="font-family: sans-serif !important; color:#3c3c3c !important; width: 100% !important; text-align: left !important; font-size: 15px !important">
                                            <tr>
                                                <td style="width: 50% !important;padding-top:5px;padding-bottom:5px;padding-right:10px;padding-left:10px;"><b>R.U.C / C.I:</b></td>
                                                <td style="width: 50% !important;padding-top:5px;padding-bottom:5px;padding-right:10px;padding-left:10px;">`+ ruc + `</td>
                                            </tr>
                                            <tr>
                                                <td style="width: 50% !important;padding-top:5px;padding-bottom:5px;padding-right:10px;padding-left:10px;"><b>Razón Social / Nombre:</b></td>
                                                <td style="width: 50% !important;padding-top:5px;padding-bottom:5px;padding-right:10px;padding-left:10px;">`+ razonSocial + `</td>
                                            </tr>
                                            <tr>
                                                <td style="width: 50% !important;padding-top:5px;padding-bottom:5px;padding-right:10px;padding-left:10px;"><b>Teléfono:</b></td>
                                                <td style="width: 50% !important;padding-top:5px;padding-bottom:5px;padding-right:10px;padding-left:10px;">`+ telefono + `</td>
                                            </tr>
                                            <tr>
                                                <td style="width: 50% !important;padding-top:5px;padding-bottom:5px;padding-right:10px;padding-left:10px;"><b>Forma de Pago:</b></td>
                                                <td style="width: 50% !important;padding-top:5px;padding-bottom:5px;padding-right:10px;padding-left:10px;">Tarjeta de Crédito</td>
                                            </tr>
                                            <tr>
                                                <td style="width: 50% !important;padding-top:5px;padding-bottom:5px;padding-right:10px;padding-left:10px;"><b>Valor a Pagar:</b></td>
                                                <td style="width: 50% !important;padding-top:5px;padding-bottom:5px;padding-right:10px;padding-left:10px; font-size: 17px !important">$ `+ total + `</td>
                                            </tr>
                                        </table>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td class="full-width-image"
                        style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0; text-align: center; background-color: #f7f7f7">
                        <br><br>
                        <a href="`+ link + `" target="_blank" style="font-size: 17px !important; text-decoration: none; padding: 15px; padding-left: 30px !important; padding-right: 30px !important; background-color: rgb(` + colores + `); color: #FFFFFF;
                        border-radius: 30px 30px 30px 30px;
                        -moz-border-radius: 30px 30px 30px 30px;
                        -webkit-border-radius: 30px 30px 30px 30px;">
                            Realizar Pago
                        </a>
                        <br><br><br>
                    </td>
                </tr>
                <tr class="white-back" style="background-color:#f7f7f7;">
                    <td class="one-column" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;">
                        <table width="100%" style="border-spacing:0;font-family:sans-serif;color:#3c3c3c;">
                            <tr>
                                <td class="inner contents"
                                    style="padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;">
                                    <p class="h4 center grey"
                                        style="margin:0;color:#3c3c3c;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:0px !important;margin-right:0 !important;margin-left:0 !important;font-size:15px!important;line-height:1.5 !important;">
                                        Este mensaje ha sido generado automáticamente, por favor no respondas a este
                                        correo.
                                        <br>
                                        *Adjuntamos nuestra <span style="color: rgb(`+ colores + `);">Política de
                                            Privacidad de
                                            Datos</span>, no olvides revisarla.
                                    </p>
                                    <br>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class="grey-back" style="background-color: rgb(`+ colores + `)">
                    <td class="one-column" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;">
                        <table width="100%" style="border-spacing:0;font-family:sans-serif;color:#fff;">
                            <tr>
                                <td class="inner contents"
                                    style="padding-top:10px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;">
                                    <p style="font-family: sans-serif !important;">
                                        <b>`+ broker + `</b>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>

            </table>
        </div>
    </center>
</body>

</html>
    `;
    return cuerpo;
  }

  public generarEmailOtro(nombrePagador: any, broker: any, ruc: any, razonSocial: any, telefono: any, ramos: any, total: any, colores: any, forma: any) {
    var cuerpo = `
    <div style="font-size: 14px !important; width: 580px !important">
    <div
      style="background-color: rgb(`+ colores + `); background-repeat: no-repeat; background-position: center; background-size: cover; min-height: calc(100vh - 850px); width: 620px">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/segurosequinoccial-45797.appspot.com/o/CorreoElectronico%2Fsegurosequinoccialblanco.png?alt=media&token=0435df66-20fb-4928-8c7e-cf5252f0255d"
        alt="`+ broker + `" width="190" style="padding-left: 20px !important; padding-right: 20px !important; padding-top: 20px !important;">
    </div>
    <section
      style="background-color: rgb(250, 250, 250); color: #303030; padding: 20px !important; text-align: justify !important; width: 580px !important; min-height: calc(100vh - 550px) !important">

      <h4>`+ nombrePagador + `</h4>
      <span style="width: 580px !important">
        Felicitaciones, estás a un paso de contar con el mejor seguro para tu empresa. Siéntete protegido y tranquilo,
        es un honor para nosotros poder ser parte de tu empresa.
      </span><br><br>
      <span>
        A continuación ponemos a tu disposición los detalles de tu seguro:
      </span><br><br>
      <span style="width: 580px !important">
        <table style="width: 100% !important">
          <tr>
            <td style="width: 150px !important; padding: 7px !important;"><b>R.U.C / C.I: </b></td>
            <td style="padding: 7px !important;">`+ ruc + `</td>
          </tr>
          <tr>
            <td style="width: 150px !important; padding: 7px !important;"><b>Razón Social / Nombre: </b></td>
            <td style="padding: 7px !important;">`+ razonSocial + `</td>
          </tr>
          <tr>
            <td style="width: 150px !important; padding: 7px !important;"><b>Teléfono: </b></td>
            <td style="padding: 7px !important;">`+ telefono + `</td>
          </tr>
          <tr>
            <td style="width: 150px !important; padding: 7px !important;"><b>Ramos Cotizados: </b></td>
            <td style="padding: 7px !important;">
              `+ ramos + `
            </td>
          </tr>
          <tr>
            <td style="width: 150px !important; padding: 7px !important;"><b>Valor a Pagar: </b></td>
            <td style="padding: 7px !important;">$ `+ total + `
      </span>
      </td>
      </tr>
      </table>
      </span><br>
      <span style="width: 580px !important">
        <b>Forma de pago: </b> `+ forma + ` <br><br>
        Una vez realizado el pago, automáticamente `+ broker + ` continuará con el proceso.
      </span><br><br><br>
    </section>
    <div
      style="background-color: #303030; color: #FFFFFF; padding: 20px; width: 580px !important; min-height: calc(100vh - 1000px)">
      <small>Este mensaje ha sido generado automáticamente, por favor no respondas a este correo.</small>
      <br>
      <div style="display: flex">
        <div style="width: 290px">
          <p><small><b>`+ broker + `</b></small></p>
        </div>
        <div style="width: 290px; text-align: right">
          <p><small>Todos los derechos reservados.</small></p>
        </div>
      </div>
    </div>
  </div>
    `;
    return cuerpo;
  }

}
