const Queue = require('bull')
const redisConfig = require('../config/redis')
const jobs = require('../jobs')

module.exports = {
    queues() {
        return Object.values(jobs).map(job => ({
            bull: new Queue(job.key, redisConfig),
            name: job.key,
            handle: job.handle
        }))
    },

    add(name, data) {
        const queue = this.queues().find(queue => queue.name === name)
        return queue.bull.add(data)
    },

    process() {
        return this.queues().forEach(queue => {
            queue.bull.process(queue.handle)

            queue.bull.on('failed', (job, err) => {
                console.log(`Failed on ${job.name}: ${err}`)
            })
        })
    }
}
