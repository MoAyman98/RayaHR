using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Entities;
using API.Entities.Identity;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class HrController : ControllerBase
    {
        private readonly IHrRepository _repo;
        private readonly UserManager<AppUser> _userManager;
        // private readonly IHttpContextAccessor _httpContextAccessor;
        public HrController(IHrRepository repo, UserManager<AppUser> userManager)
        {
            _userManager = userManager;
            _repo = repo;
        }

        //Get All Hrs
        [HttpGet]
        public async Task<IReadOnlyList<HR>> GetHrs()
        {
            return await _repo.GetHRs();
        }

        //Get Hr by Id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetHr(int id)
        {
            try
            {
                var person = await _repo.GetHR(id);
                return Ok(person);
            }
            catch (System.Exception)
            {
                return NotFound("There is no such Hr Id");
            }

        }

        //Insert new Hr
        [HttpPost]
        public async Task<IActionResult> AddHr(HR body)
        {
            await _repo.AddHr(body);
            return Ok("Hr added successfully");
        }

        //Update Hr info
        [HttpPut]
        public async Task<IActionResult> UpdateHr(HR body)
        {
            try
            {
                await _repo.UpdateHr(body);
                return Ok("Hr salary updated successfully");
            }
            catch (System.Exception)
            {
                return NotFound("There is no such Hr Id");
            }

        }

        //Delete Hr
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHr(int id)
        {
            try
            {
                await _repo.DeleteHr(id);
                return Ok("Hr info deleted successfully");
            }
            catch (System.Exception)
            {
                return NotFound("There is no such Hr Id");
            }

        }

        //Approve Hr by Admin
        [HttpPut("admin/{id}")]
        public async Task<IActionResult> ApproveHr(int id)
        {
            var x = await CheckAdmin();
            if (x)
            {
                try
                {
                    await _repo.ApproveHr(id);
                    return Ok("Hr approved by admin");
                }
                catch (System.Exception)
                {
                    return NotFound("There is no such Hr Id");
                }
            }
            else
            {
                return BadRequest("You are not welcome here");
            }
        }

        //Function to check role
        public async Task<bool> CheckAdmin()
        {
            // var email = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "sub").Value;
            // var user = _userManager.FindByEmailAsync(email);
            var x = (ClaimsIdentity)User.Identity;
            var claims = x.FindFirst(ClaimTypes.Email);
            AppUser user = await _userManager.FindByEmailAsync(claims.Value);
            if (user.role == 1)
            {
                return true;
            }
            return false;
        }
    }
}