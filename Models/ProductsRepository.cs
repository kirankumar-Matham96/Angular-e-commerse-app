using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;
using System.Net.Http;
using System.Text.Json;
using System.Text.Json.Nodes;
using System.Threading.Tasks.Dataflow;

namespace ProductsAPI.Models
{
    public class ProductsRepository
    {
        string connectionString;
        public ProductsRepository(IConfiguration config)
        {
            this.connectionString = config.GetConnectionString("DB_CONNECTION_STRING");
        }


        public async Task<List<Products>> FetchProductsFromApi()
        {
            using (HttpClient client = new HttpClient())
            {
                var response = await client.GetStringAsync("https://fakestoreapi.com/products");

                var apiProducts = JsonSerializer.Deserialize<List<ApiProducts>>(response, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                var products = apiProducts.Select(p => new Products()
                {
                    // Id = $"prod-{DateTime.Now}";
                    Id = $"prod-{Guid.NewGuid().ToString().Substring(0, 8)}",
                    Title = p.title,
                    Description = p.description,
                    Price = p.price,
                    Category = p.category,
                    Stock = 20,
                    ImageUrl = p.image
                }).ToList();

                return products;
            }
        }

        private DataTable ConvertToDataTable(List<Products> products)
        {
            DataTable table = new DataTable();

            table.Columns.Add("id", typeof(string));
            table.Columns.Add("title", typeof(string));
            table.Columns.Add("description", typeof(string));
            table.Columns.Add("price", typeof(double));
            table.Columns.Add("category", typeof(string));
            table.Columns.Add("stock", typeof(int));
            table.Columns.Add("imageUrl", typeof(string));

            foreach (var p in products)
            {
                table.Rows.Add(p.Id, p.Title, p.Description, p.Price, p.Category, p.Stock, p.ImageUrl);
            }

            return table;
        }

        public async Task BulkInsertProducts(DataTable table)
        {
            using (SqlConnection connection = new SqlConnection(this.connectionString))
            {
                await connection.OpenAsync();

                using (SqlBulkCopy bulkCopy = new SqlBulkCopy(connection))
                {
                    bulkCopy.DestinationTableName = "Products";

                    bulkCopy.ColumnMappings.Add("id", "id");
                    bulkCopy.ColumnMappings.Add("title", "title");
                    bulkCopy.ColumnMappings.Add("description", "description");
                    bulkCopy.ColumnMappings.Add("price", "price");
                    bulkCopy.ColumnMappings.Add("category", "category");
                    bulkCopy.ColumnMappings.Add("stock", "stock");
                    bulkCopy.ColumnMappings.Add("imageUrl", "imageUrl");

                    await bulkCopy.WriteToServerAsync(table);
                }
            }
        }

        public async Task ImportProductsFromApi()
        {
            var products = await FetchProductsFromApi();
            var table = ConvertToDataTable(products);
            await BulkInsertProducts(table);
        }

        public List<Products> GetProducts()
        {
            // SqlConnection
            SqlConnection sqlConnection = new SqlConnection(this.connectionString);

            // SqlDataAdapter
            SqlDataAdapter dataAdapter = new SqlDataAdapter("SELECT * FROM Products", sqlConnection);

            // DataTable
            DataTable dataTable = new DataTable();

            dataAdapter.Fill(dataTable);

            // List
            List<Products> productsList = new List<Products>();

            // DataRow
            foreach (DataRow dataRow in dataTable.Rows)
            {
                productsList.Add(new Products()
                    {
                        Id = Convert.ToString(dataRow["id"]),
                        Title = Convert.ToString(dataRow["title"]),
                        Description = Convert.ToString(dataRow["description"]),
                        Price = Convert.ToDouble(dataRow["price"]),
                        Category = Convert.ToString(dataRow["category"]),
                        Stock = Convert.ToInt32(dataRow["stock"]),
                        ImageUrl = Convert.ToString(dataRow["imageUrl"])
                }
                );
            }

            return productsList;
        }

        public void InsertProduct(Products product) {
            try
            {

                SqlConnection connection = new SqlConnection(this.connectionString);
                SqlCommand command = new SqlCommand("sp_insert_products", connection);
                command.CommandType = CommandType.StoredProcedure;

                command.Parameters.AddWithValue("@id", product.Id);
                command.Parameters.AddWithValue("@title", product.Title);
                command.Parameters.AddWithValue("@description", product.Description);
                command.Parameters.AddWithValue("@price", product.Price);
                command.Parameters.AddWithValue("@category", product.Category);
                command.Parameters.AddWithValue("@stock", product.Stock);
                command.Parameters.AddWithValue("@img", product.ImageUrl);

                connection.Open();
                command.ExecuteNonQuery();
                connection.Close();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in repo: {ex}");
            }        
        }

        public void UpdateProduct(Products product) { 
            // sql connection
            SqlConnection connection = new SqlConnection(this.connectionString);

            // sql command
            SqlCommand command = new SqlCommand("sp_update_products",connection);

            // set command type
            command.CommandType = CommandType.StoredProcedure;

            // set parameters
            command.Parameters.AddWithValue("@id", product.Id);
            command.Parameters.AddWithValue("@title", product.Title); 
            command.Parameters.AddWithValue("@description", product.Description);
            command.Parameters.AddWithValue("@price", product.Price);
            command.Parameters.AddWithValue("@category", product.Category);
            command.Parameters.AddWithValue("@stock", product.Stock);
            command.Parameters.AddWithValue("@img", product.ImageUrl);

            // open
            connection.Open();

            // execute
            command.ExecuteNonQuery();

            // close
            connection.Close();
        }

        public void DeleteRecord(string id)
        {
            // sql connection
            SqlConnection connection = new SqlConnection(this.connectionString);

            // sql command
            SqlCommand command = new SqlCommand("sp_delete_products", connection);
            
            // command type
            command.CommandType= CommandType.StoredProcedure;

            // add parameters
            command.Parameters.AddWithValue("@id", id);

            // open
            connection.Open();

            // execute query
            command.ExecuteNonQuery ();

            // close
            connection.Close ();
        }

    }
}
