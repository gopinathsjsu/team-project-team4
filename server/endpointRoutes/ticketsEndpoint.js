const express = require('express');
const router = express.Router();
const Tickets = require('../models/ticketsModel');

router.get('/tickets', async (request, response) => {
    try {
        const tickets = await Tickets.find({});
        return response.status(200).json(tickets);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message : error.message});
    }
});

router.get('/tickets/:id', async (request, response) => {
    try {
        const { id }  = request.params;
        const ticket = await Tickets.findById(id);
        return response.status(200).json(ticket);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message : error.message});
    }
});

router.post('/tickets', async (request, response) => {
    try {
        console.log(request.body);
        if (
            !request.body.userid || !request.body.seatsBooked || !request.body.showid  
        ) {
            return response.status(400).send({
                message : 'Send all required fields'
            });
        }
        const newTicket = {
            userid : request.body.userid,
            seatsBooked : request.body.seatsBooked,
            showid : request.body.showid
        }

        const ticket = await Tickets.create(newTicket);
        return response.status(200).json(ticket);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message : error.message});
    }
});


router.put('/tickets/:id', async (request, response) => {
    try {
        console.log(request.body);
        if (
            !request.body.userid || !request.body.seatsBooked || !request.body.showid  
        ) {
            return response.status(400).send({
                message : 'Send all required fields'
            });
        }
        const { id } = request.params;
        const ticket = await Tickets.findByIdAndUpdate(id, request.body);
        if (!ticket) {
            return response.status(404).json({ message : 'Ticket not found.'});
        }
        return response.status(200).json({ message : 'Ticket updated successfully.'});

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message : error.message});
    }
});

router.delete('/tickets/:id', async (request, response) => {
    try {
        const { id }  = request.params;
        const ticket = await Tickets.findByIdAndDelete(id);
        if(!ticket){
            return response.status(404).json({ message : 'Ticket not found'});
        }
        return response.status(200).json({ message : 'Ticket deleted successfully'});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message : error.message});
    }
});

module.exports = router;