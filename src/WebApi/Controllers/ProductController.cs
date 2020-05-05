using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace JtableApiTest.Controllers
{
    [ApiController]
    [Route("[controller]/[action]/{id?}")]
    public class ProductController : Controller
    {
        private List<Product> Products = new List<Product>()
        {
            new Product() {Id = 1, Price = 333, ProductCode = 13213, ProductName = "P1"},
            new Product() {Id = 1, Price = 333, ProductCode = 13213, ProductName = "P12"},
            new Product() {Id = 1, Price = 333, ProductCode = 13213, ProductName = "P12"},
            new Product() {Id = 1, Price = 333, ProductCode = 13213, ProductName = "P13"},
            new Product() {Id = 1, Price = 333, ProductCode = 13213, ProductName = "P14"},
        };

         [HttpPost]

        public IActionResult GetAllProducts()
        {
            try
            {
                return Json(new { Result = "OK", Records = Products });
            }
            catch (Exception ex)
            {

                return Json(new { Result = "ERROR", Message = ex.Message });
            }

        }


         [HttpPost]

        public JsonResult AddNewProduct([FromForm]Product obj)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return Json(new { Result = "ERROR", Message = "Form is not valid! Please correct it and try again." });
                }

                obj.Id = Products.Count + 1;
                Products.Add(obj);
                return Json(new { Result = "OK", Record = obj });
            }
            catch (Exception ex)
            {

                return Json(new { Result = "ERROR", Message = ex.Message });
            }

        }


         [HttpPost]

        public JsonResult GetProductById(int id)
        {
            try
            {
                return Json(new { Result = "OK", Record = Products.FirstOrDefault(p => p.Id == id) });
            }
            catch (Exception ex)
            {

                return Json(new { Result = "ERROR", Message = ex.Message });
            }

        }



         [HttpPost]
        public IActionResult DeleteProduct(int id)
        {
            try
            {
                var pro = Products.FirstOrDefault( p => p.Id ==id);
                return Json(new { Result = "OK" });
            }
            catch (Exception ex)
            {

                return Json(new { Result = "ERROR", Message = ex.Message });
            }

        }



         [HttpPost]
        public JsonResult EditProduct([FromForm]Product obj)
        {

            try
            {
                return Json(new { Result = "OK", Records = obj });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }


        }

    }

    public class Product
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public int Price { get; set; }
        public int ProductCode { get; set; }
    }
}
