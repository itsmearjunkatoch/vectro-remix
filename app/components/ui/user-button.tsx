import { Menu, Button, rem } from '@mantine/core'
import { Form, Link } from '@remix-run/react'
import { IconLogout, IconSettings2 } from '@tabler/icons-react'
import { getUserImgSrc } from '#app/utils/misc.tsx'
import { useUser } from '#app/utils/user.ts'

export default function UserButton() {
	const user = useUser()
	return (
		<div className="flex">
			<Menu shadow="md" width={200}>
				<Menu.Target>
					<Button
						leftSection={
							<img
								className="h-6 w-6 rounded-full object-cover"
								alt={user.name ?? user.username}
								src={getUserImgSrc(user.image?.id)}
							/>
						}
						color="cyan"
						size="s"
					>
						<div className="">{user.name}</div>
					</Button>
				</Menu.Target>
				<Menu.Dropdown>
					<Menu.Label>User</Menu.Label>
					<Form action="/logout" method="POST">
						<Menu.Item
							leftSection={
								<IconLogout style={{ width: rem(14), height: rem(14) }} />
							}
							type="submit"
						>
							Logout
						</Menu.Item>
					</Form>
					<Menu.Item
						leftSection={
							<IconSettings2 style={{ width: rem(14), height: rem(14) }} />
						}
						component={Link}
						to={`/users/${user.username}`}
					>
						Settings
					</Menu.Item>
				</Menu.Dropdown>
			</Menu>
		</div>
	)
}
