package main

import (
	"image"

	"gioui.org/f32"
	"gioui.org/layout"
	"gioui.org/op"
	"gioui.org/widget/material"
)

// START EXAMPLE OMIT
func exampleSplitRatio(gtx layout.Context, th *material.Theme) layout.Dimensions {
	return SplitRatio{Ratio: -0.3}.Layout(gtx, func(gtx layout.Context) layout.Dimensions {
		return FillWithLabel(gtx, th, "Left", red)
	}, func(gtx layout.Context) layout.Dimensions {
		return FillWithLabel(gtx, th, "Right", blue)
	})
}

// END EXAMPLE OMIT

// START WIDGET OMIT
type SplitRatio struct {
	// Ratio keeps the current layout.
	// 0 is center, -1 completely to the left, 1 completely to the right.
	Ratio float32
}

func (s SplitRatio) Layout(gtx layout.Context, left, right layout.Widget) layout.Dimensions {
	proportion := (s.Ratio + 1) / 2
	leftsize := int(proportion * float32(gtx.Constraints.Max.X))

	rightoffset := leftsize
	rightsize := gtx.Constraints.Max.X - rightoffset

	{
		var stack op.StackOp
		stack.Push(gtx.Ops)

		gtx := gtx
		gtx.Constraints.Min = image.Pt(leftsize, leftsize)
		left(gtx)

		stack.Pop()
	}

	{
		var stack op.StackOp
		stack.Push(gtx.Ops)

		op.TransformOp{}.Offset(f32.Pt(float32(rightoffset), 0)).Add(gtx.Ops)
		gtx := gtx
		gtx.Constraints.Min = image.Pt(rightsize, rightsize)
		right(gtx)

		stack.Pop()
	}

	return layout.Dimensions{Size: gtx.Constraints.Max}
}

// END WIDGET OMIT
