import cn from 'clsx'
import { forwardRef } from 'react'

import styles from './Field.module.css'
import { TypeInputProps } from './field.types'

const Field = forwardRef<HTMLTextAreaElement, TypeInputProps>(
	({ error, style, Icon, className, ...rest }, ref) => {
		return (
			<label className={cn(styles.field, className)} style={style}>
				{Icon && (
					<div className={styles.icon}>
						<Icon />
					</div>
				)}
				<textarea ref={ref} {...rest} />
				{error && <div className={styles.error}>{error.message}</div>}
			</label>
		)
	}
)

Field.displayName = 'Field'

export default Field
