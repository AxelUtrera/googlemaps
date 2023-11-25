using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace googlemaps.Models;

public class UbicacionViewModel
{
    [Display(Name = "Localizacion (Búsqueda en Google Maps):")]
    public string? Localizador {get;set;}
    public int Latitud {get;set;}
    public int Longitud {get;set;}

    [Display(Name = "Medio de transporte")]
    public SelectList? Transportes {set;get;}
    public string? Transporte {get;set;}

    [Display(Name ="Distancia entre tu ubicacion y el destino")]
    public string? Distancia {get;set;}
    [Display (Name = "Tiempo entre tu ubicacion y el destino")]
    public string? Tiempo {get;set;}
    
    [Display(Name="Mostrar la ruta")]
    public bool Ruta {get;set;}
}