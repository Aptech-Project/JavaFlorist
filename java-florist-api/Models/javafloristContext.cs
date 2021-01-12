using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace java_florist_api.Models
{
    public partial class javafloristContext : DbContext
    {
        public javafloristContext()
        {
        }

        public javafloristContext(DbContextOptions<javafloristContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Cart> Carts { get; set; }
        public virtual DbSet<Cartdetail> Cartdetails { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Contact> Contacts { get; set; }
        public virtual DbSet<Favorite> Favorites { get; set; }
        public virtual DbSet<Feedbackdatum> Feedbackdata { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<Orderdetail> Orderdetails { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<Productcategory> Productcategories { get; set; }
        public virtual DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=CRAYSPC; Database=javaflorist;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Cart>(entity =>
            {
                entity.ToTable("cart");

                entity.HasIndex(e => e.Userid, "UQ__cart__CBA1B256BF7234A4")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Userid).HasColumnName("userid");

                entity.HasOne(d => d.User)
                    .WithOne(p => p.Cart)
                    .HasForeignKey<Cart>(d => d.Userid)
                    .HasConstraintName("FK__cart__userid__4D94879B");
            });

            modelBuilder.Entity<Cartdetail>(entity =>
            {
                entity.ToTable("cartdetail");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Cartid).HasColumnName("cartid");

                entity.Property(e => e.Productid).HasColumnName("productid");

                entity.Property(e => e.Quanity).HasColumnName("quanity");

                entity.HasOne(d => d.Cart)
                    .WithMany(p => p.Cartdetails)
                    .HasForeignKey(d => d.Cartid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__cartdetai__carti__5070F446");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Cartdetails)
                    .HasForeignKey(d => d.Productid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__cartdetai__produ__5165187F");
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.ToTable("category");

                entity.HasIndex(e => e.Categoryname, "UQ__category__1A0D12CE4DEECFE7")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Categoryname)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("categoryname");

                entity.Property(e => e.Message)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("message");
            });

            modelBuilder.Entity<Contact>(entity =>
            {
                entity.ToTable("contact");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.Message)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("message");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("name");
            });

            modelBuilder.Entity<Favorite>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("favorite");

                entity.Property(e => e.Productid).HasColumnName("productid");

                entity.Property(e => e.Userid).HasColumnName("userid");

                entity.HasOne(d => d.Product)
                    .WithMany()
                    .HasForeignKey(d => d.Productid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__favorite__produc__59063A47");
            });

            modelBuilder.Entity<Feedbackdatum>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("feedbackdata");

                entity.Property(e => e.FbReply)
                    .IsRequired()
                    .HasMaxLength(8000)
                    .IsUnicode(false)
                    .HasColumnName("fbReply");

                entity.Property(e => e.Feedback)
                    .IsRequired()
                    .HasMaxLength(8000)
                    .IsUnicode(false)
                    .HasColumnName("feedback");

                entity.Property(e => e.Productid).HasColumnName("productid");

                entity.Property(e => e.Userid).HasColumnName("userid");

                entity.Property(e => e.Vote).HasColumnName("vote");

                entity.HasOne(d => d.Product)
                    .WithMany()
                    .HasForeignKey(d => d.Productid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__feedbackd__produ__5BE2A6F2");

                entity.HasOne(d => d.User)
                    .WithMany()
                    .HasForeignKey(d => d.Userid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__feedbackd__useri__5AEE82B9");
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.ToTable("order");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasMaxLength(70)
                    .IsUnicode(false)
                    .HasColumnName("address");

                entity.Property(e => e.Date)
                    .HasColumnType("datetime")
                    .HasColumnName("date");

                entity.Property(e => e.Deliverydate)
                    .HasColumnType("datetime")
                    .HasColumnName("deliverydate");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.Note)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("note");

                entity.Property(e => e.Paymentmethod)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("paymentmethod");

                entity.Property(e => e.Phonenumber)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("phonenumber");

                entity.Property(e => e.Message)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("message");

                entity.Property(e => e.Receiver)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("receiver");

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("status")
                    .HasDefaultValueSql("('processing')");

                entity.Property(e => e.Totalmoney).HasColumnName("totalmoney");

                entity.Property(e => e.Userid).HasColumnName("userid");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.Userid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__order__userid__45F365D3");
            });

            modelBuilder.Entity<Orderdetail>(entity =>
            {
                entity.ToTable("orderdetail");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Orderid).HasColumnName("orderid");

                entity.Property(e => e.Productid).HasColumnName("productid");

                entity.Property(e => e.Quantity).HasColumnName("quantity");

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.Orderdetails)
                    .HasForeignKey(d => d.Orderid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__orderdeta__order__48CFD27E");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Orderdetails)
                    .HasForeignKey(d => d.Productid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__orderdeta__produ__49C3F6B7");
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.ToTable("product");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(500)
                    .IsUnicode(false)
                    .HasColumnName("description");

                entity.Property(e => e.ImgName)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("imgName");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("name");

                entity.Property(e => e.Price).HasColumnName("price");
            });

            modelBuilder.Entity<Productcategory>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("productcategory");

                entity.Property(e => e.Categoryname)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("categoryname");

                entity.Property(e => e.Productid).HasColumnName("productid");

                entity.HasOne(d => d.CategorynameNavigation)
                    .WithMany()
                    .HasPrincipalKey(p => p.Categoryname)
                    .HasForeignKey(d => d.Categoryname)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__productca__categ__571DF1D5");

                entity.HasOne(d => d.Product)
                    .WithMany()
                    .HasForeignKey(d => d.Productid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__productca__produ__5629CD9C");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("user");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Active)
                    .HasColumnName("active")
                    .HasDefaultValueSql("('1')");

                entity.Property(e => e.Address)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("address");

                entity.Property(e => e.Birthday)
                    .HasColumnType("datetime")
                    .HasColumnName("birthday");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.ImgName)
                    .HasMaxLength(1000)
                    .IsUnicode(false)
                    .HasColumnName("imgName");

                entity.Property(e => e.Name)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("name");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("password");

                entity.Property(e => e.Phonenumber)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("phonenumber");

                entity.Property(e => e.Role)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("role")
                    .HasDefaultValueSql("('customer')");

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("username");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
