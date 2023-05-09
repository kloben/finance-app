import { computed } from 'vue'

export const VgIconProps = {
  active: Boolean
}

export function useVgIcon (props: any) {
  const fill = computed<string>(() => props.active ? '#4C1CD5' : '#949494')

  return { fill }
}

