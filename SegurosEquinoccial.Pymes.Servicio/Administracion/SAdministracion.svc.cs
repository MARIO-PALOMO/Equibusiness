using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace SegurosEquinoccial.Pymes.Servicio.Administracion
{
    // NOTA: puede usar el comando "Rename" del menú "Refactorizar" para cambiar el nombre de clase "SAdministracion" en el código, en svc y en el archivo de configuración a la vez.
    // NOTA: para iniciar el Cliente de prueba WCF para probar este servicio, seleccione SAdministracion.svc o SAdministracion.svc.cs en el Explorador de soluciones e inicie la depuración.
    public class SAdministracion : ISAdministracion
    {
        public string GetProductList(string valor)
        {
            return valor;
        }
    }
}
