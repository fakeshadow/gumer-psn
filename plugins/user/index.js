'use strict'

const {
    login: loingSchema,
    register: registerSchema,
    linkPSN: linkPSNSchema,
    getUser: getUserSchema
} = require('./schemas')

module.exports = async (fastify, opts) => {
    fastify
        .post('/register', { schema: registerSchema }, registerHandler)
        .post('/login', { schema: loingSchema }, loginHandler)

    fastify.register(async function (fastify) {
        fastify.addHook('preHandler', fastify.authPreHandler)
        fastify
            .get('/', { schema: getUserSchema }, getUserHandler)
            .post('/link', { schema: linkPSNSchema }, linkPSNHandler);
    })

    fastify.setErrorHandler((error, req, res) => {
        res.send(error);
    })
}

module.exports[Symbol.for('plugin-meta')] = {
    decorators: {
        fastify: [
            'authPreHandler',
            'userService',
            'jwt'
        ]
    }
}

async function registerHandler(req, reply) {
    const { username, password, email } = req.body;
    return this.userService.createUser({ username, password, email });
}

async function loginHandler(req, reply) {
    const { username, password } = req.body;
    const userData = await this.userService.loginUser({ username, password });
    return { jwt: this.jwt.sign(userData), profile: userData }
}

async function linkPSNHandler(req, reply) {
    const { uid } = req.user;
    const { onlineId, aboutMe } = req.body;
    const profile = await this.psnService.getPSNProfileRemote({ onlineId });
    // if (profile.aboutMe !== aboutMe) throw new Error('profile validation failed');
    await this.userService.linkPSN({ uid, npId: profile.npId });
    return { psnProfile: profile }
}

async function getUserHandler(req, reply) {
    const { uid } = req.params
    return this.userService.getUser({ uid });
}