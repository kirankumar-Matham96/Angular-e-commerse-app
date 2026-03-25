using System.Text.Json.Serialization;

namespace ProductsAPI.Models
{
    public class Products
    {
        // props
        public string Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public string Category { get; set; }
        public int? Stock { get; set; }
        public string ImageUrl { get; set; }
    }
}
