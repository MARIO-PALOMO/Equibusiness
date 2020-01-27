using SegurosEquinoccial.Pymes.Datos.Administracion;
using SegurosEquinoccial.Pymes.Entidad.Administracion;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace SegurosEquinoccial.Pymes.Datos.Gestion
{
    public class DAdmConexionSOAP
    {

        public static HttpWebRequest BroCrearSolicitudWebSOAP(string url, string accion)
        {
            HttpWebRequest Req = (HttpWebRequest)WebRequest.Create(@"" + url + "");
            Req.Headers.Add(@"SOAPAction:" + accion + "");
            Req.ContentType = "text/xml;charset=\"utf-8\"";
            Req.Accept = "text/xml";
            Req.Method = "POST";
            return Req;
        }

        public static string BroEjecutarSolicitudWebSOAP(string url, string accion, string body)
        {
            var ServiceResult = "";
            string resultado = "";
            HttpWebRequest request = BroCrearSolicitudWebSOAP(url, accion);

            XmlDocument SOAPReqBody = new XmlDocument();
            SOAPReqBody.LoadXml(@"<?xml version=""1.0"" encoding=""utf-8""?><soap:Envelope xmlns:soap=""http://schemas.xmlsoap.org/soap/envelope/"" xmlns:xsi=""http://www.w3.org/2001/XMLSchema-instance"" xmlns:xsd=""http://www.w3.org/2001/XMLSchema""><soap:Body>" + body + "</soap:Body></soap:Envelope>");

            try
            {
                using (Stream stream = request.GetRequestStream())
                {
                    SOAPReqBody.Save(stream);
                }
                using (WebResponse Serviceres = request.GetResponse())
                {
                    using (StreamReader rd = new StreamReader(Serviceres.GetResponseStream()))
                    {
                        ServiceResult = rd.ReadToEnd();
                        XmlDocument doc = new XmlDocument();
                        doc.LoadXml(ServiceResult);
                        resultado = ServiceResult;
                    }
                }
            }
            catch (WebException webex)
            {
                WebResponse errResp = webex.Response;
                using (Stream respStream = errResp.GetResponseStream())
                {
                    StreamReader reader = new StreamReader(respStream);
                    resultado = reader.ReadToEnd();
                }
            }

            return resultado;
        }

        public static string BroEjecutarSolicitudWebSOAPEmision(string url, string accion, string body)
        {
            var ServiceResult = "";
            string resultado = "";
            HttpWebRequest request = BroCrearSolicitudWebSOAP(url, accion);

            XmlDocument SOAPReqBody = new XmlDocument();

            SOAPReqBody.LoadXml(@"<?xml version=""1.0"" encoding =""utf-8"" ?>"
            + "<soap:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\" >"
            + "<soap:Header/>"
            + "<soap:Body>"
                + "<cargaItemsVarios xmlns=\"http://tempuri.org/\">"
                  + "<CadenaXML><![CDATA[<?xml version=\"1.0\" encoding =\"UTF-8\" standalone=\"yes\" ?>\n" + body + "]]></CadenaXML>"
                + "</cargaItemsVarios>"
              + "</soap:Body>"
            + "</soap:Envelope>");

            try
            {
                using (Stream stream = request.GetRequestStream())
                {
                    SOAPReqBody.Save(stream);
                }
                using (WebResponse Serviceres = request.GetResponse())
                {
                    using (StreamReader rd = new StreamReader(Serviceres.GetResponseStream()))
                    {
                        ServiceResult = rd.ReadToEnd();
                        XmlDocument doc = new XmlDocument();
                        doc.LoadXml(ServiceResult);
                        resultado = ServiceResult;
                    }
                }
            }
            catch (WebException webex)
            {
                EAdmErrores error = new EAdmErrores();
                error.message = "Error emisión póliza";
                error.name = "BroEjecutarSolicitudWebSOAPEmision";
                error.ok = "false";
                error.status = "500";
                error.statusText = "Error";
                error.url = "BroEjecutarSolicitudWebSOAPEmision";
                error.error = webex.ToString();

                string errores = DAdmErrores.AdmAlmacenarErrores(error);

                WebResponse errResp = webex.Response;
                using (Stream respStream = errResp.GetResponseStream())
                {
                    StreamReader reader = new StreamReader(respStream);
                    resultado = reader.ReadToEnd();
                }
            }

            return resultado;
        }

        public static string BroEjecutarSolicitudWebSOAPCompleto(string url, string accion, string head, string body)
        {
            var ServiceResult = "";
            string resultado = "";
            HttpWebRequest request = BroCrearSolicitudWebSOAP(url, accion);

            XmlDocument SOAPReqBody = new XmlDocument();
            SOAPReqBody.LoadXml(@"<?xml version=""1.0"" encoding=""utf-8""?><soap:Envelope xmlns:soap=""http://schemas.xmlsoap.org/soap/envelope/"" xmlns:xsi=""http://www.w3.org/2001/XMLSchema-instance"" xmlns:xsd=""http://www.w3.org/2001/XMLSchema""><soap:Header>" + head + "</soap:Header><soap:Body>" + body + "</soap:Body></soap:Envelope>");

            try
            {
                using (Stream stream = request.GetRequestStream())
                {
                    SOAPReqBody.Save(stream);
                }
                using (WebResponse Serviceres = request.GetResponse())
                {
                    using (StreamReader rd = new StreamReader(Serviceres.GetResponseStream()))
                    {
                        ServiceResult = rd.ReadToEnd();
                        XmlDocument doc = new XmlDocument();
                        doc.LoadXml(ServiceResult);
                        resultado = ServiceResult;
                    }
                }
            }
            catch (WebException webex)
            {
                WebResponse errResp = webex.Response;
                using (Stream respStream = errResp.GetResponseStream())
                {
                    StreamReader reader = new StreamReader(respStream);
                    resultado = reader.ReadToEnd();
                }
            }

            return resultado;
        }
    }


}
