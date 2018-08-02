<template>
    <animate-number
            ref="numberAnimator"
            :from="number.value"
            :to="number.value"
            :from-color="number.color"
            :to-color="number.color"
            duration="900"
            easing="easeInOutSine"
            mode="manual"/>
</template>

<script>
    export default {
        name: "AnimatedNumber",
        props: ['number'],
        watch: {
            number(currentValue, previousValue) {
                let previous = previousValue.value
                let current = currentValue.value

                this.$refs.numberAnimator.reset(previous, current, previousValue.color, currentValue.color)
                this.$refs.numberAnimator.start()
            }
        }
    }
</script>