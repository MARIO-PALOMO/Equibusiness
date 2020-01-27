using System;
using System.Collections.Generic;
using System.Text;
using System.Security.Cryptography;
using System.IO;

namespace SegurosEquinoccial.Pymes.Datos.Gestion
{
    public class DAdmEncriptacion
    {
        private static string cadenaSeguridad = "SegurosEquinoccial//Pymes//{2019}";
        private static string entrada = "DataSegurosEquinoccial";

        public static string encriptacion(string valor)
        {
            DeriveBytes condificacionKey = new Rfc2898DeriveBytes(cadenaSeguridad, Encoding.Unicode.GetBytes(entrada));
            SymmetricAlgorithm algoritmoEncriptacion = new TripleDESCryptoServiceProvider();
            byte[] claveSimetrica = condificacionKey.GetBytes(algoritmoEncriptacion.KeySize >> 3);
            byte[] vectorInicializacion = condificacionKey.GetBytes(algoritmoEncriptacion.BlockSize >> 3);
            ICryptoTransform transformacion = algoritmoEncriptacion.CreateEncryptor(claveSimetrica, vectorInicializacion);
            using (MemoryStream buffer = new MemoryStream())
            {
                using (CryptoStream stream = new CryptoStream(buffer, transformacion, CryptoStreamMode.Write))
                {
                    using (StreamWriter writer = new StreamWriter(stream, Encoding.Unicode))
                    {
                        writer.Write(valor);
                    }
                }
                return Convert.ToBase64String(buffer.ToArray());
            }
        }

        public static string CrearKeyAutorizacion(string valor)
        {
            string result = null;

            if (valor != null || valor != "")
            {
                string key = "{0}-{1}";
                key = string.Format(key, valor, DateTime.Now.Ticks);

                DeriveBytes condificacionKey = new Rfc2898DeriveBytes(cadenaSeguridad, Encoding.Unicode.GetBytes(entrada));
                SymmetricAlgorithm algoritmoEncriptacion = new TripleDESCryptoServiceProvider();
                byte[] claveSimetrica = condificacionKey.GetBytes(algoritmoEncriptacion.KeySize >> 3);
                byte[] vectorInicializacion = condificacionKey.GetBytes(algoritmoEncriptacion.BlockSize >> 3);

                ICryptoTransform transform = new TripleDESCryptoServiceProvider().CreateEncryptor(claveSimetrica, vectorInicializacion);
                byte[] input = Encoding.Default.GetBytes(key);
                byte[] buff = new byte[input.Length];
                buff = transform.TransformFinalBlock(input, 0, input.Length);

                result = Convert.ToBase64String(buff);
            }

            return result;
        }
    }
}
