using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class HrRepository : IHrRepository
    {
        private readonly DataContext _context;
        public HrRepository(DataContext context)
        {
            _context = context;
        }

        public async Task AddHr(HR body)
        {
            body.HiringDate = DateTime.Now;
            body.Status = "New";
            _context.HRs.Add(body);
            await _context.SaveChangesAsync();
        }

        public async Task ApproveHr(int id)
        {
            var Hr = await _context.HRs.FindAsync(id);
            Hr.Status = "Approved";
            _context.Update(Hr);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteHr(int id)
        {
            var Hr = await _context.HRs.FindAsync(id);
            _context.Remove(Hr);
            await _context.SaveChangesAsync();
        }

        public async Task<HR> GetHR(int id)
        {
            return await _context.HRs.FindAsync(id);
        }

        public async Task<IReadOnlyList<HR>> GetHRs()
        {
            return await _context.HRs.ToListAsync();
        }

        public async Task UpdateHr(HR body)
        {
            _context.Update(body);
            await _context.SaveChangesAsync();
        }
    }
}