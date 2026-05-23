import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
public class CreateDb {
    public static void main(String[] args) {
        String url = "jdbc:postgresql://localhost:5432/postgres";
        String user = "postgres";
        String password = "sampath0093";
        try (Connection conn = DriverManager.getConnection(url, user, password);
             Statement stmt = conn.createStatement()) {
            stmt.executeUpdate("CREATE DATABASE student_dashboard");
            System.out.println("Database student_dashboard created successfully!");
        } catch (Exception e) {
            System.out.println("Error (or already exists): " + e.getMessage());
        }
    }
}
