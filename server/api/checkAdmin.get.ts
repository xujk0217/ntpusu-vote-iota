import AES from 'crypto-js/aes.js'
import encUtf8 from 'crypto-js/enc-utf8.js'
import prisma from '~/lib/prisma'
export default defineEventHandler(async (_event) => {
    const un = getCookie(_event, 'un')
    if (un === undefined || un === null) {
        return {
            result: false
        }
    }

    const username = AES.decrypt(un, process.env.CRYPTO_KEY as string).toString(encUtf8)
    const admin = await prisma.admin.findUnique({
        where: { id: parseInt(username) }
    })

    return { result: admin !== null }
})