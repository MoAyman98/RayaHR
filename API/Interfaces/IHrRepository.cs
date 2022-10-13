using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Interfaces
{
    public interface IHrRepository
    {
        Task<IReadOnlyList<HR>> GetHRs();
        Task<HR> GetHR(int id);
        Task AddHr(HR body);
        Task UpdateHr(HR body);
        Task DeleteHr(int id);
        Task ApproveHr(int id);
    }
}