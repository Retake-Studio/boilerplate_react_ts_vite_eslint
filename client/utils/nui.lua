---@alias CursorPositionProps 'top-right' | 'bottom-right' | 'center' | vector2 | {x: number, y: number}

---@class SendReactValue
---@field action string (Name of the action in UseNuiEvent)
---@field data? any (Data send to the argument in UseNuiEvent)

---@class SendReactOptions
---@field focus? boolean | { [1]: boolean, [2]: boolean } | 'ignore'
---@field locations? CursorPositionProps
---@field keepInput? boolean

local SetCursorLocation <const> = SetCursorLocation
local SetNuiFocusKeepInput<const> = SetNuiFocusKeepInput
local SendNUIMessage <const> = SendNUIMessage
local SetNuiFocus <const> = SetNuiFocus

---@type table<string, vector2>
local cusorPosition <const> = {
    ['top-right'] = vec2(.90, .10),
    ['bottom-right'] = vec2(.90, .90),
    ['center'] = vec2(.50, .50),
}

--- SendReactMessage
---@param value? SendReactValue
---@param options? SendReactOptions
local function SendReactMessage(value, options)
    if type(value) == 'table' and type(value.action) == 'string' then
        SendNUIMessage({
            action = value.action, ---@as string (Name of the action in UseNuiEvent)
            data = value.data, ---@as any (Data send to the argument in UseNuiEvent)
        })
    end

    if options then
        if type(options.focus) == 'boolean' then
            SetNuiFocus(options.focus, options.focus)
        elseif type(options.focus) == 'table' then
            if table.type(options.focus) == 'array' then
                SetNuiFocus(options.focus[1], options.focus[2])
            elseif table.type(options.focus) == 'hash' then
                ---@todo
            end
        elseif type(options.focus) == 'string' and options.focus == 'ignore' then
            goto ignore
        end

        if type(options.locations) == 'string' and cusorPosition[options.locations] then
            SetCursorLocation(cusorPosition[options.locations].x, cusorPosition[options.locations].y)
        elseif type(options.locations) == 'table' then
            SetCursorLocation(options.locations[1] or options.locations.x, options.locations[2] or options.locations.y)
        elseif type(options.locations) == 'function' --[[@as vector2]] then
            SetCursorLocation(options.x, options.y)
        end

        if type(options.keepInput) == 'boolean' then
            SetNuiFocusKeepInput(options.keepInput)
        end

        ---@todo Need more options about focus options?
        ::ignore::
    end
end

local function ResetFocus()
    SetNuiFocus(false, false)
end

_ENV.ResetFocus = ResetFocus
_ENV.SendReactMessage = SendReactMessage

--[[
    SetCursorLocation(0.90, 0.90) bottom-right
    SetNuiFocus(true, true)
    SetNuiFocusKeepInput(true)
    IsNuiFocused()
--]]