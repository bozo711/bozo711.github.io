public class Compute {
  public static void main(String[] a) {
    int n = a.length > 0 ? Integer.parseInt(a[0]) : 20;
    long x = 0, y = 1;
    for (int i = 0; i < n; i++) { long t = x + y; x = y; y = t; }
    System.out.println("{\"lang\":\"Java\",\"what\":\"fibonacci(" + n + ")\",\"result\":" + x + "}");
  }
}
