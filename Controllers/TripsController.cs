using System;
using Microsoft.AspNetCore.Mvc;
using Trips.Data;

namespace Trips.Controllers
{
    [Route("api/[controller]")]
    public class TripsController : Controller
    {
        private ITripService _service;
        public TripsController(ITripService service)
        {
            _service = service;
        }
        [HttpGet("[action]")]
        public IActionResult GetTrips()
        {
            try
            {
                var allTrips = _service.GetAllTrips();
                return Ok(allTrips);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }



        }
        [HttpPost("AddTrip")]
        public IActionResult AddTrip([FromBody] Trip trip)
        {
            if (trip != null)
            {
                _service.addTrip(trip);
            }
            return Ok(trip);

        }
        [HttpPut("UpdateTrip/{id}")]
        public IActionResult Update(int id, [FromBody] Trip trip)
        {
            _service.UpdateTrip(id, trip);
            return Ok(trip);

        }
        [HttpDelete("DeleteTrip/{id}")]
        public IActionResult Delete(int id)
        {
            _service.DeleteTrip(id);
            return Ok();
        }
        [HttpGet("ById/{id}")]
        public IActionResult GetTripById(int id)
        {
            var trip = _service.GetTripById(id);
            return Ok(trip);
        }

    }
}