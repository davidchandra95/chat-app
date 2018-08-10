// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

router.post('/register', (req, res) => {

   turbo.createUser(req.body)
      .then(data => {
         req.vertexSession.user = {id: data.id}
         
         res.json({
            confirmation: 'success',
            data: data
         })
      })
      .catch(err => {
         res.json({
            confirmation: 'fail',
            message: err.message
         })
      })
})

router.post('/login', (req, res) => {

   turbo.login(req.body)
      .then(data => {
         req.vertexSession.user = {id: data.id}
         res.json({
            confirmation: 'success',
            data: data
         })
      })
      .catch(err => {
         res.json({
            confirmation: 'fail',
            message: err.message
         })
      })
})

router.get('/currentUser', (req, res) => {
   if (req.vertexSession == null && req.vertexSession.user == null) {
      res.json({
         confirmation: 'success',
         user: null
      })

      return;
   }

   turbo.fetchOne('user', req.vertexSession.user.id)
      .then(data => {
         res.json({
            confirmation: 'success',
            user: data
         })
      })
      .catch(err => {
         res.json({
            confirmation: 'fail',
            message: err.message
         })
      })
})

router.get('/logout', (req, res) => {
   req.vertexSession.reset() // destroy session

   res.json({
      confirmation: 'success',
      user: null
   })
})

module.exports = router
