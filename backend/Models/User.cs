namespace backend.Models
{
    public class User
    {
        public string FullName { get; set; } = string.Empty;
        public string EmailId { get; set; } = string.Empty;
        public string MobileNo { get; set; } = string.Empty;
        public string ResumeUrl { get; set; } = string.Empty;
        public bool IsConfirmed { get; set; }
    }

}
