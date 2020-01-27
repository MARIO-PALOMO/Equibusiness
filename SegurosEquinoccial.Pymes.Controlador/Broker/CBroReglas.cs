using SegurosEquinoccial.Pymes.Datos.Broker;
using SegurosEquinoccial.Pymes.Entidad.Broker;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SegurosEquinoccial.Pymes.Controlador.Broker
{
    public class CBroReglas
    {
        public static List<EBroReglas> ConsultaReglasRamosSubramos(int IdBroker)
        {
            return DBroReglas.ConsultaReglasRamosSubramos(IdBroker);
        }

        public static List<EBroReglasAdicionales> ConsultaReglasAdicionalesRamosSubramos(int IdBroker)
        {
            return DBroReglas.ConsultaReglasAdicionalesRamosSubramos(IdBroker);
        }
    }
}
