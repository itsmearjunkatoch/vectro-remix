import { type DataFunctionArgs } from '@remix-run/node'
import { requireUserId } from '#app/utils/auth.server.ts'
import { validateCSRF } from '#app/utils/csrf.server.ts'
import {
	profileUpdateActionIntent,
	profileUpdateAction,
	signOutOfSessionsActionIntent,
	signOutOfSessionsAction,
} from './profile.index.tsx'

export async function action({ request }: DataFunctionArgs) {
	const userId = await requireUserId(request)
	const formData = await request.formData()
	await validateCSRF(formData, request.headers)
	const intent = formData.get('intent')
	switch (intent) {
		case profileUpdateActionIntent: {
			return profileUpdateAction({ request, userId, formData })
		}
		case signOutOfSessionsActionIntent: {
			return signOutOfSessionsAction({ request, userId, formData })
		}
		// case deleteDataActionIntent: {
		// return deleteDataAction({ request, userId, formData })
		// }
		default: {
			throw new Response(`Invalid intent "${intent}"`, { status: 400 })
		}
	}
}
