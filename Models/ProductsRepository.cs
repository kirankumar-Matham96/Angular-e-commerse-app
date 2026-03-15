using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;

namespace ProductsAPI.Models
{
    public class ProductsRepository
    {
        string connectionString;
        public ProductsRepository(IConfiguration config)
        {
            this.connectionString = config.GetConnectionString("DB_CONNECTION_STRING");
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
                        Name = Convert.ToString(dataRow["title"]),
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
            SqlConnection connection = new SqlConnection(this.connectionString);
            SqlCommand command = new SqlCommand("sp_insert_products", connection);
            command.CommandType = CommandType.StoredProcedure;

            command.Parameters.AddWithValue("@id", product.Id);
            command.Parameters.AddWithValue("@name", product.Name);
            command.Parameters.AddWithValue("@description", product.Description);
            command.Parameters.AddWithValue("@price", product.Price);
            command.Parameters.AddWithValue("@category", product.Category);
            command.Parameters.AddWithValue("@stock", product.Stock);
            command.Parameters.AddWithValue("@img", product.ImageUrl);

            connection.Open();
            command.ExecuteNonQuery();
            connection.Close();
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
            command.Parameters.AddWithValue("@name", product.Name); 
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
