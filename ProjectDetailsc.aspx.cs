#region usings
using System;
using System.Web;
using System.Text;
using System.Data;
using System.Data.SqlClient;
using System.Web.Script.Serialization;
using System.Collections.Generic;
#endregion

public partial class ProductDetails : System.Web.UI.Page
{
    #region public variable declarations
    public string strqueryProjectDetails = "SELECT [ProjectName], d.FirstName + ' ' + d.LastName as 'Developer', CASE WHEN Status = 1 THEN 'Green' WHEN Status = 2 THEN 'Yellow' WHEN Status = 3 THEN 'Red' ELSE 'Red' END AS 'StatusDescription', [IsInProgress] , sc.Description as 'StateDescription',  [Comment] ,  [ModifiedDate] ,  [ModifiedBy]   FROM Tables";
    public string strqueryProjectMatrix = "SELECT  CASE WHEN Status = 1 THEN 'Green' WHEN Status = 2 THEN 'Yellow' WHEN Status = 3 THEN 'Red' ELSE 'Red' END AS 'StatusDescription',COUNT(*) as 'value' from tables";
    public string strConnectionString = "Data Source=xxx;Initial Catalog=xxx;Persist Security Info=True;User ID=xxx;Password=xxxx;MultipleActiveResultSets=True";
    #endregion

    protected void Page_Load(object sender, EventArgs e)
    {

        // Clear out the buffer
        Response.ClearHeaders();
        Response.ClearContent();
        Response.Clear();
        // Do not cache response
        Response.Cache.SetCacheability(HttpCacheability.NoCache);
        // Set the content type and encoding for JSON
        Response.ContentType = "application/json";
        Response.ContentEncoding = Encoding.UTF8;

        DataSet dataSetPrj = new DataSet();
        DataSet dataSetMatrix = new DataSet();

        using (SqlConnection  connection = new SqlConnection(strConnectionString))
        {
            connection.Open();

            using (SqlDataAdapter adapter = new SqlDataAdapter(strqueryProjectDetails, connection))
            {
                adapter.Fill(dataSetPrj);
            }

            using (SqlDataAdapter adapterMatrix = new SqlDataAdapter(strqueryProjectMatrix, connection))
            {
                adapterMatrix.Fill(dataSetMatrix);
            }            
        }

        List<ProjectCls> prjs = new List<ProjectCls>();
        prjs = FillProjectDetails(dataSetPrj);

        List<ProjectMatrix> prjMatrix = new List<ProjectMatrix>();
        prjMatrix = FillProjectMatrix(dataSetMatrix);


        string results = string.Empty;

        if (Request["p"] == "1")
        {

            results = new JavaScriptSerializer().Serialize(prjMatrix);
        }
        else
        {

            results = new JavaScriptSerializer().Serialize(prjs);
        }

        Response.Write(results);

        // Flush the response buffer
        //Response.Flush();

        // Complete the request.  NOTE: Do not use Response.End() here,
        // because it throws a ThreadAbortException, which cannot be caught!
        //HttpContext.Current.ApplicationInstance.CompleteRequest();
        Response.End();
    }


    public List<ProjectCls> FillProjectDetails(DataSet dataset)
    {
        DataSet ds = new DataSet();
        ds = dataset;

        List<ProjectCls> prjs = new List<ProjectCls>();
        foreach (DataRow dr in ds.Tables[0].Rows)
        {
            prjs.Add(new ProjectCls
            {
                ProjectName = Convert.ToString(dr["ProjectName"]),
                Developer = Convert.ToString(dr["Developer"]),
                StatusDescription = Convert.ToString(dr["StatusDescription"]),
                IsInProgress = Convert.ToString(dr["IsInProgress"]).Equals("True") ? "Yes" : "No",                
                StateDescription = Convert.ToString(dr["StateDescription"]),
                Comment = Convert.ToString(dr["Comment"]),
                ModifiedDate = Convert.ToString(dr["ModifiedDate"]),
                ModifiedBy = Convert.ToString(dr["ModifiedBy"])
            });
        }

        return prjs;
    }

    public List<ProjectMatrix> FillProjectMatrix(DataSet dataset)
    {
        DataSet ds = new DataSet();
        ds = dataset;
        string chartval = string.Empty;
        string chartLabel = string.Empty;
        List<ProjectMatrix> prjs = new List<ProjectMatrix>();
        foreach (DataRow dr in ds.Tables[0].Rows)
        {
            if (Convert.ToString(dr["StatusDescription"]).Equals("Green"))
            {
                chartval = "#88c46c";
                chartLabel = "All Good";
            }
            else if (Convert.ToString(dr["StatusDescription"]).Equals("Yellow"))
            {
                chartval = "#ffde59";
                chartLabel = "Caution";
            }
            else if (Convert.ToString(dr["StatusDescription"]).Equals("Red"))
            {
                chartval = "#db4d3e";
                chartLabel = "Danger";
            }
            else
            {
                chartval = "#b9d2e9";
                chartLabel = "No Status";
            }

            prjs.Add(new ProjectMatrix
            {
                color = chartval,
                value = Convert.ToInt32(dr["value"]),
                label = chartLabel
            });
        }
        return prjs;
    }

}



public class ProjectCls
{
    public string ProjectName { get; set; }
    public string Developer { get; set; }
    public string StatusDescription { get; set; }
    public string IsInProgress { get; set; }
    public string StateDescription { get; set; }
    public string Comment { get; set; }
    public string ModifiedDate { get; set; }
    public string ModifiedBy { get; set; }
}

public class ProjectMatrix
{
    public int value { get; set; }
    public string color { get; set; }
    public string label { get; set; }
}
