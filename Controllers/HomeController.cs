using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using googlemaps.Models;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace googlemaps.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        var Transportes = new Dictionary<string, string>{
            {"DRIVING", "Automovil"},
            {"WALKING", "Caminando"},
            {"BICYCLING", "Bicicleta"}
        };

        var SelectList = new SelectList(Transportes, "Key", "Value");

        var model = new UbicacionViewModel
        {
            Transportes = SelectList,
            Ruta = true
        };
        
        return View(model);
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
