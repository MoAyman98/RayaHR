using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<HR> HRs { get; set; }

        // protected override void OnModelCreating(ModelBuilder modelBuilder)
        // {
        //     modelBuilder.Entity<HR>().Property(x => x.HiringDate).HasDefaultValue(DateTime.Now);
        //     modelBuilder.Entity<HR>().Property(x => x.Status).HasDefaultValue("New");
        // }
    }
}