using Authorization.DAL;
using Authorization.DTO;
using Authorization.Models;
using Authorization.Models.ViewModels;
using Authorization.Services;
using BCrypt.Net;
using DevOne.Security.Cryptography.BCrypt;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Authorization.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserRepository _userRepository;
        private JWTService _jwtService;

        public UserController(IUserRepository userRepository, JWTService jwtService)
        {
            _userRepository = userRepository;
            _jwtService = jwtService;
        }
        [HttpPost("user-login")]
        public IActionResult Login([FromBody] LoginDTO data)
        {
            try
            {
                var user = _userRepository.CheckPassword(data.Email, data.Password);
                if (user != null)
                {
                    var jwt = _jwtService.Generate(user.Id);
                    Response.Cookies.Append("jwt", jwt, new CookieOptions
                    {
                        HttpOnly = true
                    });

                    return Ok("Login success");
                }
                return BadRequest("Password invalid");
            }
            catch (Exception)
            {
                return BadRequest("User not found");
            }
        }
        [HttpPost("user-register")]
        public IActionResult RegisterUser([FromBody] RegisterDTO userDTO)
        {
            try
            {
                User user = new User
                {
                    FirstName = userDTO.FirstName,
                    LastName = userDTO.LastName,
                    Password = BCrypt.Net.BCrypt.HashPassword(userDTO.Password),
                    Email = userDTO.Email
                };
                _userRepository.RegisterUser(user);
                return Created("User succesfully created ", user);
            }
            catch (Exception)
            {
                return BadRequest("Email is exist");
            }
        }
        [HttpDelete("user-delete")]
        public IActionResult DeleteUser(string email)
        {
            try
            {
                _userRepository.DeleteUser(email);
                return Ok("User delete suscessful");
            }
            catch (Exception)
            {
                return BadRequest("User not found");
            }
        }
        [HttpPut("user-edit")]
        public IActionResult EditUser(EditDTO dto)
        {
            try
            {
                var user = new User()
                {
                    Id = dto.Id,
                    FirstName = dto.FirstName,
                    LastName = dto.LastName,
                    Email = dto.Email,
                    Password = dto.Password,
                };
                _userRepository.EditUser(user);
                return Ok(user);
            }
            catch (Exception)
            {
                return BadRequest("User not found");
            }
        }

        [HttpGet("user")]
        public IActionResult User()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.Verify(jwt);
                int userId = int.Parse(token.Issuer);
                var user = _userRepository.GetUserById(userId);
                return Ok(user);
            }
            catch (Exception)
            {

                return Unauthorized();
            }
        }

        [HttpPost("user-logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");
            return Ok(new
            {
                message = "Success"
            });
        }
    }
}
